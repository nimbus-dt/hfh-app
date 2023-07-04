import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataStore, Auth } from 'aws-amplify';
import {
  Card,
  Grid,
  Button,
  Flex,
  Menu,
  MenuItem,
  Image,
  Heading,
  Text,
  Divider,
  Collection,
  SelectField,
  Link,
  Authenticator,
} from '@aws-amplify/ui-react';
import { Habitat, Application } from '../../models';
import logoHabitat from '../../assets/images/logoHabitat.svg';
import { AffiliatePrescreens } from './AffiliatePrescreens';

export function AffiliateLayout() {
  const [page, setPage] = useState('prescreens');
  const [habitat, setHabitat] = useState(null);
  const [prescreens, setPrescreens] = useState([]);
  const [userID, setUserID] = useState('');
  const [isUserAllowed, setIsUserAllowed] = useState(false); // New state to track user access
  const [isLoading, setIsLoading] = useState(true); // New state to track loading status

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

        const applications = (
          await habitatObject[0].Applications.toArray()
        ).filter((app) => app.submitted === true);
        setPrescreens(applications);

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
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  const title = (
    <Flex direction="column">
      <Heading level={3} fontWeight="bold">
        Welcome
      </Heading>
      <Heading level={3} marginTop="-10px" fontWeight="bold">
        {habitat?.name}
      </Heading>
      <Heading level={3} marginTop="-10px" fontWeight="bold">
        Habitat for Humanity
      </Heading>
    </Flex>
  );

  let content;
  if (isLoading) {
    content = <Text>Loading...</Text>;
  } else if (isUserAllowed) {
    content = (
      <>
        <Card
          wrap
          width="100%"
          backgroundColor="#55B949"
          padding="0"
          columnStart="1"
          columnEnd="-1"
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

        <Card width="80%" variation="elevated">
          {title}
        </Card>

        <Card width="80%" variation="elevated">
          <Flex direction="column" alignItems="center">
            {page === 'prescreens' && (
              <AffiliatePrescreens prescreens={prescreens} />
            )}
          </Flex>
        </Card>
      </>
    );
  } else {
    content = (
      <Card width="80%" variation="elevated">
        <Text>
          Sorry, you are not allowed to access this page. Please contact the
          administrator for assistance.
        </Text>
      </Card>
    );
  }

  return (
    <Flex direction="column" height="100vh" alignItems="center">
      {content}
    </Flex>
  );
}
