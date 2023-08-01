import {
  Menu,
  MenuItem,
  Flex,
  Heading,
  Card,
  Image,
  Badge,
  SelectField,
  Divider,
  Collection,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataStore, Auth } from 'aws-amplify';
import { Habitat, Application, UserProps } from '../../../models';
import logoHabitat from '../../../assets/images/logoHabitat.svg';

export function FormHome() {
  /* CONSTS */

  const urlName = useParams('habitat').habitat;
  const [habitat, setHabitat] = useState(null);
  const [user, setUser] = useState(null);
  const [apps, setApps] = useState({ CURRENT: [], PAST: [] });
  const [userProps, setUserProps] = useState(null);

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
      } catch (error) {
        console.log(`Error getting user's applications: ${error}`);
      }
    }
    setApplications();
  }, [user]);

  /* UI */

  const title = (
    <Card variation="elevated" width="80%">
      <Flex direction="column">
        <Heading level={3} fontWeight="bold">
          Welcome
        </Heading>
        <Heading level={3} marginTop="-10px" fontWeight="bold">
          {userProps?.name}
        </Heading>
      </Flex>
    </Card>
  );

  const applications = (
    <Card variation="elevated" width="80%">
      <Flex direction="column" width="100%" alignContent="center">
        <Flex direction="row" width="100%" marginLeft="0">
          <SelectField>
            <option value="CURRENT">Current</option>
            <option value="PAST">Past</option>
          </SelectField>
        </Flex>
        <Heading level={3} fontWeight="bold" textAlign="center">
          PreScreens
        </Heading>
        <Divider />
        <Collection
          width="100%"
          type="grid"
          gap="15px"
          items={apps}
          isSearchable
          isPaginated
          itemsPerPage={1}
          searchPlaceholder="Type to search..."
          searchFilter={(item, keyword) =>
            item.ownerName?.toLowerCase().includes(keyword.toLowerCase())
          }
        >
          {(item, index) => (
            <Flex key={index} width="auto" direction="column">
              <Table caption="" highlightOnHover variation="bordered">
                <TableBody>
                  <TableRow>
                    <TableCell as="th" width="25%">
                      Name
                    </TableCell>
                    <TableCell as="th" width="25%">
                      Date Submitted
                    </TableCell>
                    <TableCell as="th" width="25%">
                      Status
                    </TableCell>
                    <TableCell as="th" width="25%" />
                  </TableRow>
                  <TableRow>
                    <TableCell>{item.ownerName}</TableCell>
                    <TableCell>{item.dateSubmitted}</TableCell>
                    <TableCell>{item.submittedStatus}</TableCell>
                    <TableCell>
                      <Button>View</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Flex>
          )}
        </Collection>
      </Flex>
    </Card>
  );

  const layout = (
    <Flex width="100%" direction="column" alignItems="center">
      {title}
      {applications}
    </Flex>
  );

  return layout;
}
