import { useEffect, useState } from 'react';
import { Outlet, useOutlet, useNavigate, Navigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Flex, Text, useAuthenticator } from '@aws-amplify/ui-react';
import Authentication from 'components/Authentication';
import BaseLayout from 'layouts/BaseLayout';
import { User } from 'models';
import { AUTHENTICATION_STATUS } from 'utils/constants';
import useHabitat from 'hooks/utils/useHabitat';
import SignUpQuestions from './SignUpQuestions';
import style from './NewAffiliateLayout.module.css';

const NewAffiliateLayout = () => {
  const { habitat, setHabitat } = useHabitat();
  const [isUserAllowed, setIsUserAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(0);
  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);
  const [userData, setUserData] = useState();
  const outlet = useOutlet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!outlet) {
      navigate(`./home`);
    }
  }, [outlet, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading((previousIsLoading) => previousIsLoading + 1);
      try {
        const allowedUsers = habitat.users || [];

        if (user && allowedUsers.includes(user.username)) {
          setIsUserAllowed(true);
        } else {
          setIsUserAllowed(false);
        }
      } catch (error) {
        console.log(`Error fetching habitat: ${error}`);
      }
      setIsLoading((previousIsLoading) => previousIsLoading - 1);
    };

    fetchData();
  }, [user, authStatus, setHabitat, habitat]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const persistUserDatas = await DataStore.query(User, (c) =>
          c.owner.eq(user.username)
        );
        if (persistUserDatas.length > 0) {
          setUserData(persistUserDatas[0]);
        }
      } catch (error) {
        console.log('Error fetching user data.');
      }
    };

    if (user && !userData) {
      getUserData();
    }
  });

  if (isLoading) {
    return (
      <Flex direction="column" height="100vh" alignItems="center">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (AUTHENTICATION_STATUS.AUTHENTICATED !== authStatus) {
    return <Authentication type="affiliate" habitat={habitat} />;
  }

  if (!userData) {
    return (
      <SignUpQuestions
        user={user}
        setUserData={setUserData}
        isUserAllowed={isUserAllowed}
      />
    );
  }

  if (!isUserAllowed) {
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
      <BaseLayout variation="affiliate" hideSideBar={!isUserAllowed}>
        <Outlet
          context={{
            habitat,
            setHabitat,
          }}
        />
      </BaseLayout>
    </div>
  );
};

export default NewAffiliateLayout;
