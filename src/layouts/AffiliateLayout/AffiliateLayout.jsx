import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import {
  Card,
  Flex,
  Text,
  View,
  useBreakpointValue,
  ScrollView,
  Authenticator,
  useAuthenticator,
  Heading,
} from '@aws-amplify/ui-react';

import Authentication from 'components/Authentication';
import CustomCard from 'components/CustomCard';
import NavBar from 'components/NavBar';
import { Habitat } from 'models';
import {
  COLORS,
  DEFAULT_REVIEW_STATUS,
  AUTHENTICATION_STATUS,
} from 'utils/constants';

import Loading from 'components/Loading';
import Sidebar from './Sidebar';

const AffiliateLayout = () => {
  const [habitat, setHabitat] = useState(null);
  const [isUserAllowed, setIsUserAllowed] = useState(false); // New state to track user access
  const [isLoading, setIsLoading] = useState(0); // New state to track loading status
  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);

  const isLargeLayout = useBreakpointValue({
    base: false,
    large: true,
  });

  const responsiveBool = useBreakpointValue({
    base: true,
    small: true,
    medium: true,
    large: false,
    xl: false,
    xxl: false,
  });

  const habitatUrlName = useParams('habitat').habitat;

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
        console.log(habitatsResponse);
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

  if (isLoading) {
    return (
      <Flex direction="column" height="100vh" alignItems="center">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (AUTHENTICATION_STATUS.AUTHENTICATED !== authStatus) {
    return (
      <Authentication
        authenticationHeader={habitat?.authenticationHeader}
        affiliate
        habitat={habitat.urlName}
      />
    );
  }

  return (
    <LayoutParent isLargeLayout={isLargeLayout}>
      {authStatus === 'authenticated' && isUserAllowed && (
        <Sidebar authStatus={authStatus} />
      )}

      <View
        flex="1"
        grow={isLargeLayout ? 1 : 0}
        height={isLargeLayout ? '100%' : 'calc(100% - 6rem)'}
        overflow="hidden"
      >
        <ScrollView grow={1} height="100%">
          <Flex
            width="100%"
            minHeight="100%"
            direction="column"
            margin="auto"
            alignItems="center"
          >
            {authStatus === 'unauthenticated' || !isUserAllowed ? (
              <>
                <NavBar isAuthenticated={authStatus === 'authenticated'} />
                <Flex
                  width={responsiveBool ? '100%' : '80%'}
                  direction="column"
                  alignItems="center"
                >
                  <CustomCard>
                    <Heading level={4} fontWeight="bold" textAlign="center">
                      Affiliate Portal
                    </Heading>
                  </CustomCard>
                  {authStatus === 'authenticated' && !isUserAllowed && (
                    <CustomCard>
                      <Text>
                        Sorry, you are not allowed to access this page. Please
                        contact the administrator for assistance.
                      </Text>
                    </CustomCard>
                  )}
                  {authStatus === 'unauthenticated' && (
                    <CustomCard>
                      <Authenticator hideDefault />
                    </CustomCard>
                  )}
                </Flex>
              </>
            ) : (
              <Card
                alignSelf="stretch"
                variation={responsiveBool ? '' : 'elevated'}
                justifyContent="center"
                grow={1}
                wrap
                margin={!responsiveBool && '1rem'}
              >
                <Outlet
                  context={{
                    habitat,
                    setHabitat,
                    addCustomStatusToHabitat,
                    removeCustomStatusToHabitat,
                    updateCustomStatusToHabitat,
                  }}
                />
              </Card>
            )}
          </Flex>
        </ScrollView>
      </View>
    </LayoutParent>
  );
};

const LayoutParent = ({ isLargeLayout, children }) => {
  if (!isLargeLayout) {
    return (
      <View height="100vh" width="100vw">
        {children}
      </View>
    );
  }

  return (
    <Flex
      height="100vh"
      weight="100%"
      gap="0rem"
      backgroundColor={COLORS.CANVAS}
      grow={1}
      overflow="hidden"
    >
      {children}
    </Flex>
  );
};

LayoutParent.propTypes = {
  isLargeLayout: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default AffiliateLayout;
