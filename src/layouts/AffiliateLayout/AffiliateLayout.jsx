import { useEffect, useCallback } from 'react';
import { Outlet, useOutlet, useNavigate, Navigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify/datastore';

import { Flex, Text, useAuthenticator } from '@aws-amplify/ui-react';

import Authentication from 'components/Authentication';
import useAsync from 'hooks/utils/useAsync';
import useHabitat from 'hooks/utils/useHabitat';
import BaseLayout from 'layouts/BaseLayout';
import { User } from 'models';
import { AUTHENTICATION_STATUS } from 'utils/constants';
import { Status } from 'utils/enums';

import SignUpQuestions from './SignUpQuestions';
import style from './AffiliateLayout.module.css';

const AffiliateLayout = () => {
  const { habitat } = useHabitat();
  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);

  const outlet = useOutlet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!outlet) {
      navigate(`./home`);
    }
  }, [outlet, navigate]);

  const getData = useCallback(async () => {
    try {
      if (user && habitat) {
        const response = await DataStore.query(User, (c) =>
          c.owner.eq(user.username)
        );
        if (response.length <= 0) {
          return undefined;
        }

        return {
          userData: response[0],
          userAllow: habitat.users.includes(user.username),
        };
      }
    } catch (error) {
      console.log('Error fetching user data.');
    }
  }, [habitat, user]);

  const {
    value,
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
    return (
      <Flex direction="column" height="100vh" alignItems="center">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (authStatus !== AUTHENTICATION_STATUS.AUTHENTICATED) {
    return <Authentication type="affiliate" />;
  }

  if (!value || !user) {
    return (
      <Flex direction="column" height="100vh" alignItems="center">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  const { userData, userAllow } = value;

  if (!userData) {
    return (
      <SignUpQuestions
        user={user}
        setUserData={setUserData}
        isUserAllowed={userAllow}
      />
    );
  }

  if (!userAllow) {
    localStorage.setItem('goto', 'forms');
    return (
      <div>
        <div className={style.notAllowedContainer}>
          <Text>
            Sorry,{' '}
            <b style={{ fontWeight: 'bold' }}>
              {habitat?.longName || 'this habitat'}
            </b>{' '}
            has not authorized you to access this page. Contact{' '}
            <a href="mailto:support@habitat-app.org">support@habitat-app.org</a>{' '}
            for more information.
          </Text>
        </div>
      </div>
    );
  }

  const path = window.location.pathname.split('/').pop();
  if (localStorage.getItem('goto') === 'forms' && path !== 'forms') {
    return <Navigate to={`/${habitat.urlName}/affiliate/forms`} />;
  }

  return (
    <div>
      <BaseLayout variation="affiliate" hideSideBar={!userAllow}>
        <Outlet />
      </BaseLayout>
    </div>
  );
};

export default AffiliateLayout;
