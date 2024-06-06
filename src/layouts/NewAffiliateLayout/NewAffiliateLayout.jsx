import { useCallback, useEffect, useState } from 'react';
import { Outlet, useParams, useOutlet, useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Flex, Text, useAuthenticator } from '@aws-amplify/ui-react';
import Authentication from 'components/Authentication';
import { Habitat, User } from 'models';
import { DEFAULT_REVIEW_STATUS, AUTHENTICATION_STATUS } from 'utils/constants';
import BaseLayout from 'layouts/BaseLayout';
import SignUpQuestions from './SignUpQuestions';
import style from './NewAffiliateLayout.module.css';

const NewAffiliateLayout = () => {
  const [habitat, setHabitat] = useState(null);
  const [isUserAllowed, setIsUserAllowed] = useState(false); // New state to track user access
  const [isLoading, setIsLoading] = useState(0); // New state to track loading status
  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);
  const [userData, setUserData] = useState();
  const outlet = useOutlet();
  const navigate = useNavigate();

  const habitatUrlName = useParams('habitat').habitat;

  useEffect(() => {
    if (!outlet) {
      navigate(`./forms`);
    }
  }, [outlet, navigate, habitatUrlName]);

  const addCustomStatusToHabitat = useCallback(
    async (newCustomStatus) => {
      try {
        const original = await DataStore.query(Habitat, habitat);
        const persistedHabitat = await DataStore.save(
          Habitat.copyOf(original, (originalHabitat) => {
            if (
              !(
                originalHabitat.props.customStatus
                  ? originalHabitat.props.customStatus
                  : []
              ).includes(newCustomStatus) &&
              newCustomStatus !== DEFAULT_REVIEW_STATUS
            ) {
              originalHabitat.props.customStatus = originalHabitat.props
                .customStatus
                ? [...originalHabitat.props.customStatus, newCustomStatus]
                : [newCustomStatus];
            }
          })
        );
        setHabitat(persistedHabitat);
      } catch (error) {
        console.log(`Error updating the habitat's custom status.`);
      }
    },
    [habitat]
  );

  const removeCustomStatusToHabitat = useCallback(
    async (customStatus) => {
      try {
        const original = await DataStore.query(Habitat, habitat);
        const persistedHabitat = await DataStore.save(
          Habitat.copyOf(original, (originalHabitat) => {
            originalHabitat.props.customStatus =
              originalHabitat.props.customStatus.filter(
                (customStatusIntem) => customStatusIntem !== customStatus
              );
          })
        );
        setHabitat(persistedHabitat);
      } catch (error) {
        console.log(`Error removing a custom status from the habitat.`);
      }
    },
    [habitat]
  );

  const updateCustomStatusToHabitat = useCallback(
    async (oldCustomStatus, newCustomStatus) => {
      try {
        const original = await DataStore.query(Habitat, habitat);
        const persistedHabitat = await DataStore.save(
          Habitat.copyOf(original, (originalHabitat) => {
            originalHabitat.props.customStatus = [
              ...originalHabitat.props.customStatus.filter(
                (customStatusIntem) => customStatusIntem !== oldCustomStatus
              ),
              newCustomStatus,
            ];
          })
        );
        setHabitat(persistedHabitat);
      } catch (error) {
        console.log(`Error updating a custom status from the habitat.`);
      }
    },
    [habitat]
  );

  // fetch habitat on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading((previousIsLoading) => previousIsLoading + 1);
      try {
        const habitatsResponse = await DataStore.query(Habitat, (c) =>
          c.urlName.eq(habitatUrlName)
        );

        const habitatObject = habitatsResponse[0];

        setHabitat(habitatObject);

        const allowedUsers = habitatObject.users || [];

        if (allowedUsers.includes(user.username)) {
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
  }, [habitatUrlName, user, authStatus]);

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
        habitat={habitat}
        user={user}
        setUserData={setUserData}
      />
    );
  }

  return (
    <div>
      {isUserAllowed ? (
        <BaseLayout variation="affiliate" hideSideBar={!isUserAllowed}>
          <Outlet
            context={{
              habitat,
              setHabitat,
              addCustomStatusToHabitat,
              removeCustomStatusToHabitat,
              updateCustomStatusToHabitat,
            }}
          />
        </BaseLayout>
      ) : (
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
      )}
    </div>
  );
};

export default NewAffiliateLayout;
