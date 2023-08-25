import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { DataStore, Auth } from 'aws-amplify';
import {
  Card,
  Flex,
  Text,
  View,
  useBreakpointValue,
  ScrollView,
} from '@aws-amplify/ui-react';
import { Habitat, Application } from '../../models';
import { Topbar } from './Topbar';
import { COLORS } from '../../utils/constants';
import Sidebar from './Sidebar';

export function AffiliateLayout() {
  const [habitat, setHabitat] = useState(null);
  const [userID, setUserID] = useState('');
  const [isUserAllowed, setIsUserAllowed] = useState(false); // New state to track user access
  const [isLoading, setIsLoading] = useState(true); // New state to track loading status

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

  const urlName = useParams('habitat').habitat;

  // Get habitat
  useEffect(() => {
    const fetchHabitat = async () => {
      try {
        const habitatObject = await DataStore.query(Habitat, (c) =>
          c.urlName.eq(urlName)
        );
        setHabitat(habitatObject[0]);

        const allowedUsers = habitatObject[0].users || [];
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });
        setUserID(currentUser.username);

        if (allowedUsers.includes(currentUser.username)) {
          setIsUserAllowed(true);
        } else {
          setIsUserAllowed(false);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(`Error fetching habitat: ${error}`);
      }
    };

    fetchHabitat();
  }, []);

  useEffect(() => {
    async function fetchApplication() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });

        const applicationObject = await DataStore.query(Application, (c) =>
          c.ownerID.eq(currentUser.username)
        );

        setUserID(
          applicationObject.length > 0 ? applicationObject[0].ownerID : ''
        );
        setIsLoading(false);
      } catch (error) {
        console.log(`Error retrieving Application object: ${error}`);
      }
    }

    fetchApplication();
  }, [userID]); // Add userID as a dependency

  if (isLoading) {
    return (
      <Flex direction="column" height="100vh" alignItems="center">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (!isUserAllowed) {
    return (
      <Flex direction="column" height="100vh" alignItems="center">
        <Card width="80%" variation="elevated">
          <Text>
            Sorry, you are not allowed to access this page. Please contact the
            administrator for assistance.
          </Text>
        </Card>
      </Flex>
    );
  }

  return (
    <LayoutParent isLargeLayout={isLargeLayout}>
      <Sidebar />

      <View
        grow={isLargeLayout ? 1 : 0}
        height={isLargeLayout ? '100%' : 'calc(100% - 6rem)'}
        overflow="hidden"
      >
        <ScrollView grow={1} height="100%">
          <Flex width="100%" minHeight="100%" direction="column">
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
              <Outlet context={{ habitat }} />
            </Card>
          </Flex>
        </ScrollView>
      </View>
    </LayoutParent>
  );
}

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
