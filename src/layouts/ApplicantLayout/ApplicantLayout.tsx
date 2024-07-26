import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { DataStore } from 'aws-amplify/datastore';

import { useAuthenticator } from '@aws-amplify/ui-react';

import Authentication from 'components/Authentication';
import useAsync from 'hooks/utils/useAsync';
import useHabitat from 'hooks/utils/useHabitat';
import useScrollToTopOnRouteChange from 'hooks/utils/useScrollToTopOnRouteChange';
import BaseLayout from 'layouts/BaseLayout';
import { User } from 'models';
import { Status } from 'utils/enums';
import GalleryProps from 'components/Authentication/Gallery/types';

import { AUTHENTICATION_STATUS } from './utils';
import SignUpQuestions from './SignUpQuestions';

const ApplicantLayout = () => {
  useScrollToTopOnRouteChange();

  const { habitat } = useHabitat();

  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);

  const getData = useCallback(async () => {
    try {
      if (user) {
        const response = await DataStore.query(User, (c) =>
          c.owner.eq(user.username)
        );
        if (response.length > 0) {
          return response[0];
        }

        return undefined;
      }
    } catch (error) {
      console.log(error);
      console.log('Error fetching user data.');
    }
  }, [user]);

  const {
    value: userData,
    setValue: setUserData,
    status,
  } = useAsync({
    asyncFunction: getData,
  });

  if (
    !habitat ||
    authStatus === AUTHENTICATION_STATUS.CONFIGURING ||
    status === Status.PENDING
  ) {
    return <div>Loading...</div>;
  }

  if (authStatus !== AUTHENTICATION_STATUS.AUTHENTICATED) {
    const gallery = habitat?.props?.gallery as GalleryProps['data'];
    return <Authentication type="applicant" gallery={gallery} />;
  }

  if (!userData) {
    return <SignUpQuestions user={user} setUserData={setUserData} />;
  }

  return (
    <BaseLayout variation="applicant">
      <Outlet />
    </BaseLayout>
  );
};

export default ApplicantLayout;
