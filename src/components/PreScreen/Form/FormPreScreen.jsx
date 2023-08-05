/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useLocation } from 'react-router-dom';
import {
  Flex,
  Heading,
  Card,
  Pagination,
  Button,
  Text,
} from '@aws-amplify/ui-react';
import { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Habitat, Application } from '../../../models';
import { HouseholdForm } from './Household/HouseholdForm';
import { SavingsForm } from './Savings/SavingsForm';
import { DebtForm } from './Debt/DebtForm';
import { IncomeForm } from './Income/IncomeForm';
import { ConfirmForm } from './Confirm/ConfirmForm';

export function FormPreScreen() {
  /* CONTS */
  const [habitat, setHabitat] = useState({});
  const urlName = useParams().habitat;
  const [application, setApplication] = useState({});
  const location = useLocation();
  const applicationID = location.state?.application;
  const [page, setPage] = useState(1);

  /* USE EFFECTS */
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
    async function getApplication() {
      try {
        const applicationObject = await DataStore.query(
          Application,
          applicationID
        );
        setApplication(applicationObject[0]);
      } catch (error) {
        console.log(`Error getting application: ${error}`);
      }
    }
    getApplication();
  }, []);

  function formSet() {
    if (page === 1) {
      return <HouseholdForm application={application} habitat={habitat} />;
    }
    if (page === 2) {
      return <SavingsForm application={application} habitat={habitat} />;
    }
    if (page === 3) {
      return <DebtForm application={application} habitat={habitat} />;
    }
    if (page === 4) {
      return <IncomeForm application={application} habitat={habitat} />;
    }
    if (page === 5) {
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
    <Flex direction="column" gap="xl" width="100%">
      {formSet()}
      <Flex justifyContent="space-between" alignItems="center" width="100%">
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
          totalPages={5}
          siblingCount={1}
          width="100%"
        />
        <Button
          onClick={() => {
            if (page !== 5) {
              setPage(page + 1);
            }
          }}
          width="fit-content"
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );

  return application?.submitted ? completeForm : incompleteForm;
}
