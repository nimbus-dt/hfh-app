import {
  Flex,
  Heading,
  Card,
  SelectField,
  Divider,
  Collection,
  Button,
  Text,
} from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataStore, Auth } from 'aws-amplify';
import { Habitat, Application, UserProps } from 'models';

export function FormApplicationsPage() {
  /* CONSTS */

  const urlName = useParams('habitat').habitat;
  const [habitat, setHabitat] = useState(null);
  const [cycle, setCycle] = useState(null);
  const [user, setUser] = useState(null);
  const [apps, setApps] = useState({ CURRENT: [], PAST: [] });
  const [userProps, setUserProps] = useState(null);
  const [timeStatus, setTimeStatus] = useState('CURRENT');
  const navigate = useNavigate();

  /* FUNCTIONS */
  async function createApplication() {
    try {
      if (!habitat) {
        console.log('Habitat information is not available.');
        return;
      }

      // Create an application associated with the active cycle
      const application = await DataStore.save(
        new Application({
          ownerID: user?.username,
          habitatID: habitat.id,
          submitted: false,
          ownerName: userProps?.name,
          timeStatus: 'CURRENT',
          submittedStatus: 'PENDING',
        })
      );

      console.log('Application created:', application);
      window.location.reload();
    } catch (error) {
      console.log(`Error creating application: ${error}`);
    }
  }

  /* USE EFFECTS */

  // Fetch habitat
  useEffect(() => {
    async function getHabitat() {
      try {
        const habitatObject = await DataStore.query(Habitat, (c) =>
          c.urlName.eq(urlName)
        );
        setHabitat(habitatObject[0]);
      } catch (error) {
        console.log(`Could not retrieve Habitat: ${error}`);
      }
    }
    getHabitat();
  }, [urlName]);

  useEffect(() => {
    async function getCycle() {
      try {
        const CycleObject = await DataStore.query(Habitat, (c) =>
          c.cycleID.eq(cycle.id)
        );
        setCycle(CycleObject[0]);
        console.log(CycleObject[0]);
      } catch (error) {
        console.log(`Could not retrieve Cycle: ${error}`);
      }
    }
    getCycle();
  }, [habitat]);

  // Fetch user
  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });
        setUser(currentUser);
      } catch (error) {
        console.log(`Error getting user: ${error}`);
      }
    }
    getUser();
  }, []);

  // Fetch user props
  useEffect(() => {
    async function getUserProps() {
      try {
        const userPropsObject = await DataStore.query(UserProps, (c) =>
          c.ownerID.eq(user?.username)
        );
        setUserProps(userPropsObject[0]);
      } catch (error) {
        console.log(`Error getting user props: ${error}`);
      }
    }
    getUserProps();
  }, [user]);

  // Fetch applications and filter them
  useEffect(() => {
    async function setApplications() {
      try {
        const applicationsObject = await DataStore.query(Application, (c) =>
          c.ownerID.eq(user?.username)
        );

        // filter timeStatus === 'CURRENT'
        const currentApplications = applicationsObject.filter(
          (application) => application.timeStatus === 'CURRENT'
        );

        // filter timeStatus === 'PAST'
        const pastApplications = applicationsObject.filter(
          (application) => application.timeStatus === 'PAST'
        );

        // set apps
        setApps({
          CURRENT: currentApplications,
          PAST: pastApplications,
        });
      } catch (error) {
        console.log(`Error getting user's applications: ${error}`);
      }
    }
    setApplications();
  }, [user]);

  /* UI */

  const applications = (
    <Collection
      width="100%"
      type="grid"
      gap="15px"
      items={apps[timeStatus]}
      isPaginated
      itemsPerPage={1}
    >
      {(item, index) => (
        <Flex key={index} width="auto" direction="column">
          <Card width="100%" variation="outlined">
            <Flex direction="column" width="100%" gap="5px">
              <Text width="100%">{item.ownerName}</Text>
              <Text width="100%">
                {item.submitted ? 'Submitted' : 'Not submitted'}
              </Text>
              <Button
                width="fit-content"
                variation="primary"
                marginTop="5px"
                onClick={() => {
                  navigate('../app', {
                    state: { applicationID: item.id },
                  });
                }}
              >
                View
              </Button>
            </Flex>
          </Card>
        </Flex>
      )}
    </Collection>
  );

  const noCurrentApplications = (
    <Flex direction="column" width="100%" alignItems="center">
      <Text textAlign="center">
        You have no current applications started. Please click below to begin a
        new one.
      </Text>
      <Button
        variation="primary"
        width="fit-content"
        onClick={() => {
          createApplication();
        }}
      >
        Create New Application
      </Button>
    </Flex>
  );

  const noPastApplications = (
    <Flex direction="column" width="100%" alignItems="center">
      <Text textAlign="center">You have no past applications.</Text>
    </Flex>
  );

  const collectionWrapper = (
    <Card variation="elevated" width="100%">
      <Flex direction="column" width="100%" alignContent="center">
        <Flex direction="row" width="100%" marginLeft="0">
          <SelectField
            onChange={(event) => {
              setTimeStatus(event.target.value);
            }}
          >
            <option value="CURRENT">Current</option>
            <option value="PAST">Past</option>
          </SelectField>
        </Flex>
        <Heading level={3} fontWeight="bold" textAlign="center">
          PreScreens
        </Heading>
        <Divider />
        {timeStatus === 'CURRENT' && apps.CURRENT.length > 0 && applications}
        {timeStatus === 'CURRENT' &&
          apps.CURRENT.length === 0 &&
          noCurrentApplications}
        {timeStatus === 'PAST' && apps.PAST.length > 0 && applications}
        {timeStatus === 'PAST' && apps.PAST.length === 0 && noPastApplications}
      </Flex>
    </Card>
  );

  const layout = (
    <Flex width="100%" direction="column" alignItems="center">
      {collectionWrapper}
    </Flex>
  );

  return layout;
}
