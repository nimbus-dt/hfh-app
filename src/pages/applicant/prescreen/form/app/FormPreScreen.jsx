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
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import {
  Habitat,
  Application,
  HouseholdMember,
  SavingRecord,
  DebtRecord,
  UserProps,
  IncomeRecord,
} from 'models';
import { HouseholdForm } from './HouseholdForm';
import { SavingsForm } from './SavingsForm';
import { DebtForm } from './DebtForm';
import { IncomeForm } from './IncomeForm';
import { ConfirmForm } from './ConfirmForm';

const createRecordsSubscription = ({ applicationID, model, callback }) =>
  DataStore.observeQuery(model, (c) =>
    c.applicationID.eq(applicationID)
  ).subscribe(({ items, isSynced }) => {
    if (!isSynced) {
      return;
    }

    callback(items);
  });

export function FormPreScreenPage() {
  const [application, setApplication] = useState({});
  const [habitat, setHabitat] = useState({});
  const [householdMembers, setHouseholdMembers] = useState([]);
  const [savingRecords, setSavingRecords] = useState([]);
  const [debtRecords, setDebtRecords] = useState([]);
  const [incomeRecords, setIncomeRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [owners, setOwners] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const applicationID = location.state?.applicationID;
  const urlName = useParams().habitat;
  const nextBtnIsDisabled =
    (page === 1 && householdMembers.length <= 0) ||
    (page === 2 && savingRecords.length <= 0) ||
    (page === 3 && debtRecords.length <= 0) ||
    (page === 4 && incomeRecords.length <= 0) ||
    page >= 5;

  // fetch habitat
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

  // fetch application
  useEffect(() => {
    async function fetchApplication() {
      try {
        const applicationObject = await DataStore.query(
          Application,
          applicationID
        );

        setApplication(applicationObject);
      } catch (error) {
        console.log('Error retrieving Application', error);
      }
    }

    fetchApplication();
  }, []);

  // fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUserResponse = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });

        setCurrentUser(currentUserResponse);
      } catch (error) {
        console.log('Error retrieving current user', error);
      }
    };

    fetchUser();
  }, []);

  // set owners
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const getOwners = async () => {
      try {
        const userProps = await DataStore.query(UserProps, (c) =>
          c.ownerID.eq(currentUser.username)
        );

        const ownersArray = [userProps[0]];

        if (householdMembers.length > 0) {
          const coapplicants = householdMembers.filter(
            (member) => member.isCoapplicant
          );

          if (coapplicants.length > 0) {
            ownersArray.push(...coapplicants);
          }
        }

        setOwners(ownersArray);
      } catch (error) {
        console.log('Error retrieving current user', error);
      }
    };

    getOwners();
  }, [currentUser, householdMembers]);

  // fetch and create lists subscription
  useEffect(() => {
    const householdMembersSubscription = createRecordsSubscription({
      applicationID,
      model: HouseholdMember,
      callback: (items) => setHouseholdMembers(items),
    });

    const savingRecordsSubscription = createRecordsSubscription({
      applicationID,
      model: SavingRecord,
      callback: (items) => setSavingRecords(items),
    });

    const debtRecordsSubscription = createRecordsSubscription({
      applicationID,
      model: DebtRecord,
      callback: (items) => setDebtRecords(items),
    });

    const incomeRecordsSubscription = createRecordsSubscription({
      applicationID,
      model: IncomeRecord,
      callback: (items) => setIncomeRecords(items),
    });

    return () => {
      householdMembersSubscription.unsubscribe();
      savingRecordsSubscription.unsubscribe();
      debtRecordsSubscription.unsubscribe();
      incomeRecordsSubscription.unsubscribe();
    };
  }, [applicationID]);

  function formSet() {
    if (page === 1) {
      return (
        <HouseholdForm
          applicationID={applicationID}
          householdMembers={householdMembers}
          habitatMaxCoapplicants={habitat?.props?.data?.maxCoapplicants}
        />
      );
    }
    if (page === 2) {
      return (
        <SavingsForm
          applicationID={applicationID}
          savingRecords={savingRecords}
          owners={owners}
        />
      );
    }
    if (page === 3) {
      return (
        <DebtForm
          applicationID={applicationID}
          debtRecords={debtRecords}
          owners={owners}
        />
      );
    }
    if (page === 4) {
      return (
        <IncomeForm
          application={application}
          habitat={habitat}
          incomeRecords={incomeRecords}
          owners={owners}
        />
      );
    }
    if (page === 5) {
      return (
        <ConfirmForm
          application={application}
          householdMembers={householdMembers}
          savingRecords={savingRecords}
          debtRecords={debtRecords}
          incomeRecords={incomeRecords}
        />
      );
    }
  }

  const completeForm = (
    <Card variation="elevated" width="100%">
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
          disabled={nextBtnIsDisabled}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );

  return application?.submitted ? completeForm : incompleteForm;
}
