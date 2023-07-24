/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Flex,
  Heading,
  Card,
  Divider,
  Pagination,
  Button,
  Text,
  Authenticator,
} from '@aws-amplify/ui-react';
import { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from 'aws-amplify';
import { Habitat, UserProps, Application } from '../../../models';
import { UserForm } from './UserForm';
import { HouseholdForm } from './Household/HouseholdForm';
import { SavingsForm } from './Savings/SavingsForm';
import { DebtForm } from './Debt/DebtForm';
import { IncomeForm } from './Income/IncomeForm';
import { ConfirmForm } from './Confirm/ConfirmForm';

export function FormLayout() {
  const [habitat, setHabitat] = useState({});
  const urlName = useParams().habitat;
  const [userID, setUserID] = useState('');
  const [applicationExists, setApplicationExists] = useState(false);
  const [application, setApplication] = useState({});
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();
  const [signedUp, setSignedUp] = useState(false);

  // Get signUp param
  const location = useLocation();
  const signUpBool = location.state?.signUpBool;

  useEffect(() => {
    async function checkExistingData() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });

        setUserID(currentUser.username);

        const applicationObject = await DataStore.query(Application, (c) =>
          c.ownerID.eq(currentUser.username)
        );

        if (applicationObject.length > 0) {
          setApplicationExists(true);
          setApplication(applicationObject[0]);
        }
      } catch (error) {
        console.log('Error retrieving  existing data', error);
      }

      const userPropObject = await DataStore.query(UserProps, (c) =>
        c.ownerID.eq(userID)
      );
      if (userPropObject.length > 0) {
        setUserExists(true);
      }
    }
    checkExistingData();
  }, []);

  useEffect(() => {
    async function fetchHabitat() {
      try {
        const habitatObject = await DataStore.query(Habitat, (c) =>
          c.urlName.eq(urlName)
        );
        setHabitat(habitatObject[0]);
      } catch (error) {
        console.log('Error retrieving Habitat', error);
      }
    }
    fetchHabitat();
  }, []);

  useEffect(() => {
    async function createNewApplication() {
      if (!applicationExists && habitat?.id && userID) {
        try {
          const newApplication = await DataStore.save(
            new Application({
              ownerID: userID,
              habitatID: habitat?.id,
              submitted: false,
            })
          );
          setApplication(newApplication);
        } catch (error) {
          console.log(`Error retrieving Application object: ${error}`);
        }
      }
    }

    createNewApplication();
  }, [habitat, userID, applicationExists]);

  const title = (
    <Flex direction="column">
      <Heading level={3} fontWeight="bold">
        {habitat?.name}
      </Heading>
      <Heading level={3} marginTop="-10px" fontWeight="bold">
        Habitat for Humanity
      </Heading>
      <Heading level={3} marginTop="-10px" fontWeight="bold">
        PreScreen Form
      </Heading>
    </Flex>
  );

  const [page, setPage] = useState(1);

  function formSet() {
    if (page === 1) {
      return <UserForm />;
    }
    if (page === 2) {
      return <HouseholdForm application={application} habitat={habitat} />;
    }
    if (page === 3) {
      return <SavingsForm application={application} habitat={habitat} />;
    }
    if (page === 4) {
      return <DebtForm application={application} habitat={habitat} />;
    }
    if (page === 5) {
      return <IncomeForm application={application} habitat={habitat} />;
    }
    if (page === 6) {
      return <ConfirmForm application={application} />;
    }
  }

  const completeForm = (
    <Card variation="elevated" width="300px">
      <Flex direction="column">
        <Heading level="5" textAlign="center">
          Application submitted!
        </Heading>
        <Flex direction="column" gap="0">
          <Text fontWeight="bold">Status:</Text>
          <Text>{application?.submittedStatus}</Text>
        </Flex>
        <Flex direction="column" gap="0">
          <Text>
            {
              habitat?.props?.prePreScreen?.prePreScreenStatusPage[
                application?.submittedStatus
              ]
            }
          </Text>
        </Flex>
      </Flex>
    </Card>
  );

  const incompleteForm = (
    <Card
      variation="outlined"
      wrap
      width={{ base: '80%', medium: '700px' }}
      marginBottom="30px"
    >
      <Divider marginBottom="10px" />
      <Flex direction="column" gap="xl">
        {title}
        {formSet()}
        <Flex justifyContent="space-between" alignItems="center">
          <Button
            onClick={() => {
              if (page !== 1) {
                setPage(page - 1);
              }
            }}
            width="fit-content"
          >
            Previous
          </Button>
          <Pagination
            currentPage={page}
            totalPages={6}
            siblingCount={1}
            width="100%"
          />
          <Button
            onClick={() => {
              if (page !== 6) {
                setPage(page + 1);
              }
            }}
            width="fit-content"
            isDisabled={!userExists}
          >
            Next
          </Button>
        </Flex>
      </Flex>
      <Divider marginTop="20px" />
    </Card>
  );

  let formComponent;
  if (applicationExists) {
    formComponent = application?.submitted ? completeForm : incompleteForm;
  } else {
    formComponent = <div>Loading...</div>;
  }

  return (
    <Authenticator hideDefault={signedUp} hideSignUp={signedUp}>
      {formComponent}
    </Authenticator>
  );
}
