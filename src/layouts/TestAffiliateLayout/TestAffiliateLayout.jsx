import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
  ThemeProvider,
} from '@aws-amplify/ui-react';
import { CustomCard } from 'components/Test/Reusable/CustomCard';
import { TestNav } from 'components/Test/Layout/TestNav';
import { Habitat } from '../../models';
import { Topbar } from './Topbar';
import { COLORS } from '../../utils/constants';
import Sidebar from './Sidebar';

const TestAffiliateLayout = () => {
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

    if (authStatus === 'authenticated') {
      fetchData();
    }
  }, [habitatUrlName, user, authStatus]);

  if (isLoading) {
    return (
      <Flex direction="column" height="100vh" alignItems="center">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  return (
    <LayoutParent isLargeLayout={isLargeLayout}>
      {authStatus === 'authenticated' && isUserAllowed && (
        <Sidebar authStatus={authStatus} />
      )}

      <View
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
                <TestNav isAuthenticated={authStatus === 'authenticated'} />
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
                  {!isUserAllowed && (
                    <CustomCard>
                      <Text>
                        Sorry, you are not allowed to access this page. Please
                        contact the administrator for assistance.
                      </Text>
                    </CustomCard>
                  )}
                  {authStatus === 'unauthenticated' && (
                    <CustomCard>
                      <ThemeProvider
                        theme={{
                          name: 'homeownership-authentication',
                          tokens: {
                            components: {
                              authenticator: {
                                container: {
                                  widthMax: '100%',
                                },
                                router: {
                                  borderStyle: 'none',
                                  boxShadow: 'none',
                                },
                              },
                            },
                          },
                        }}
                      >
                        <Authenticator hideDefault hideSignUp />
                      </ThemeProvider>
                    </CustomCard>
                  )}
                </Flex>
              </>
            ) : (
              <>
                <Topbar habitatName={habitat?.name} />
                <Card
                  width={responsiveBool ? '100%' : '80%'}
                  variation={responsiveBool ? '' : 'elevated'}
                  justifyContent="center"
                  margin="auto"
                  marginTop="1rem"
                  marginBottom="1rem"
                  grow={1}
                  wrap
                >
                  <Outlet context={{ habitat, setHabitat }} />
                </Card>
              </>
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

export default TestAffiliateLayout;
