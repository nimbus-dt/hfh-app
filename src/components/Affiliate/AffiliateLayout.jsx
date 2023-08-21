import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { DataStore, Auth } from 'aws-amplify';
import {
  Card,
  Flex,
  Menu,
  MenuItem,
  Image,
  Heading,
  Text,
  View,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import { Habitat, Application } from '../../models';
import logoHabitat from '../../assets/images/logoHabitat.svg';
import { AffiliatePrescreens } from './AffiliatePrescreens';
import AffiliateSettingsPage from '../../pages/Affiliate/Settings';

export function AffiliateLayout({ page }) {
  const [habitat, setHabitat] = useState(null);
  const [prescreens, setPrescreens] = useState([]);
  const [userID, setUserID] = useState('');
  const [isUserAllowed, setIsUserAllowed] = useState(false); // New state to track user access
  const [isLoading, setIsLoading] = useState(true); // New state to track loading status

  const responsiveBool = useBreakpointValue({
    base: true,
    small: true,
    medium: true,
    large: false,
    xl: false,
    xxl: false,
  });

  const navigate = useNavigate();

  const urlName = useParams('habitat').habitat;

  // Get habitat

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      // Sign-out successful, perform any additional actions or navigate to the desired page
    } catch (error) {
      console.log('Error signing out:', error);
      // Handle sign-out error
    }
  };

  useEffect(() => {
    const fetchHabitat = async () => {
      try {
        const habitatObject = await DataStore.query(Habitat, (c) =>
          c.urlName.eq(urlName)
        );
        setHabitat(habitatObject[0]);

        if (page === 'prescreens') {
          const applications = (
            await habitatObject[0].Applications.toArray()
          ).filter((app) => app.submitted === true);
          setPrescreens(applications);
        }

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

  // ...

  const menu = (
    <Menu className="my-menu-content" triggerClassName="my-menu-trigger">
      <MenuItem>PreScreen</MenuItem>
      <MenuItem onClick={() => navigate('../cycle')}> Create Cycle</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  const title = (
    <Flex direction="column">
      <Heading level={3} fontWeight="bold">
        Welcome {habitat?.name} Habitat for Humanity
      </Heading>
    </Flex>
  );

  if (isLoading) {
    return (
      <Flex direction="column" height="100vh" alignItems="center">
        <Text>Loading...</Text>;
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
    <View height="100vh" width="100%">
      <Card
        wrap
        width="100%"
        backgroundColor="#55B949"
        padding="0"
        columnStart="1"
        columnEnd="-1"
        marginBottom="1rem"
      >
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image alt="Habitat Logo" src={logoHabitat} height="100%" />
          <Flex marginRight="40px">{menu}</Flex>
        </Flex>
      </Card>

      <Card
        width={{ base: '95%', medium: '80%' }}
        variation="elevated"
        margin="auto"
      >
        {title}
      </Card>

      <Flex direction="column" width="100%" grow="1">
        <Card
          width={responsiveBool ? '100%' : '80%'}
          variation={responsiveBool ? '' : 'elevated'}
          justifyContent="center"
          minHeight="100%"
          margin="auto"
          marginTop="1rem"
          marginBottom="1rem"
          wrap
        >
          <Flex direction="column" width="100%" alignContent="center">
            {page === 'prescreens' && (
              <AffiliatePrescreens prescreens={prescreens} />
            )}
            {page === 'settings' && (
              <AffiliateSettingsPage
                habitatId={habitat.id}
                habitatProps={habitat.props}
              />
            )}
          </Flex>
        </Card>
      </Flex>
    </View>
  );
}

AffiliateLayout.propTypes = {
  page: PropTypes.oneOf(['prescreens', 'settings']).isRequired,
};
