import { useParams, useLocation } from 'react-router-dom';

import {
  Flex,
  Heading,
  Card,
  Pagination,
  Button,
  Text,
  Alert,
} from '@aws-amplify/ui-react';
import { useMemo, useState } from 'react';
import useHabitatByUrlName from 'hooks/services/useHabitatByUrlName';
import useCurrentAuthenticatedUser from 'hooks/services/useCurrentAuthenticatedUser';
import {
  useApplicationById,
  useDebtRecordsObserveQuery,
  useHouseholdMembersObserveQuery,
  useIncomeRecordsObserveQuery,
  useSavingRecordsObserveQuery,
} from 'hooks/services';
import useApplicationRecordsOwners from 'hooks/services/useApplicationRecordsOwners';
import { validateRecords } from 'utils/validators';
import { HouseholdForm } from './HouseholdForm';
import { SavingsForm } from './SavingsForm';
import { DebtForm } from './DebtForm';
import { IncomeForm } from './IncomeForm';
import { ConfirmForm } from './ConfirmForm';
import {
  DEBTS_OWNERS_VALIDATION_ALERT,
  INCOMES_OWNERS_VALIDATION_ALERT,
  RECORD_AMOUNT_VALIDATION_ALERT,
  SAVINGS_OWNERS_VALIDATION_ALERT,
} from './alerts';

export function FormPreScreenPage() {
  const location = useLocation();
  const { applicationID } = location.state;
  const { habitat: habitatUrlName } = useParams();
  const { data: application } = useApplicationById({
    id: applicationID,
  });
  const { habitat, error: habitatError } = useHabitatByUrlName({
    habitatUrlName,
  });
  const { currentUser } = useCurrentAuthenticatedUser();
  const { data: householdMembers } = useHouseholdMembersObserveQuery({
    criteria: (c) => c.applicationID.eq(applicationID),
    dependencyArray: [applicationID],
  });
  const { data: debtRecords } = useDebtRecordsObserveQuery({
    criteria: (c) => c.applicationID.eq(applicationID),
    dependencyArray: [applicationID],
  });
  const { data: savingRecords } = useSavingRecordsObserveQuery({
    criteria: (c) => c.applicationID.eq(applicationID),
    dependencyArray: [applicationID],
  });
  const { data: incomeRecords } = useIncomeRecordsObserveQuery({
    criteria: (c) => c.applicationID.eq(applicationID),
    dependencyArray: [applicationID],
  });
  const { data: owners } = useApplicationRecordsOwners({
    currentUser,
    householdMembers,
    dependencyArray: [currentUser, householdMembers],
  });

  const ownersIDs = useMemo(() => {
    if (!owners) {
      return [];
    }

    return new Set(owners.map((owner) => owner.id));
  }, [owners]);

  const [alerts, setAlerts] = useState([]);
  const [page, setPage] = useState(1);
  const nextBtnIsDisabled = page === 5;

  const addAlerts = (newAlerts) => {
    setAlerts(newAlerts);
  };

  const removeAlert = (keyToRemove) => {
    const newAlerts = alerts.filter((alert) => alert.key !== keyToRemove);
    setAlerts(newAlerts);
  };

  const isValidToMoveToNextPage = () => {
    const newAlerts = [];
    let isValid = true;

    switch (page) {
      case 1:
        if (householdMembers.length <= 0) {
          addAlerts([RECORD_AMOUNT_VALIDATION_ALERT]);
          isValid = false;
        }

        return isValid;

      case 2:
        if (savingRecords.length <= 0) {
          newAlerts.push(RECORD_AMOUNT_VALIDATION_ALERT);
          isValid = false;
        }

        if (!validateRecords(savingRecords, ownersIDs)) {
          newAlerts.push(SAVINGS_OWNERS_VALIDATION_ALERT);
          isValid = false;
        }

        addAlerts(newAlerts);
        return isValid;

      case 3:
        if (debtRecords.length <= 0) {
          newAlerts.push(RECORD_AMOUNT_VALIDATION_ALERT);
          isValid = false;
        }

        if (!validateRecords(debtRecords, ownersIDs)) {
          newAlerts.push(DEBTS_OWNERS_VALIDATION_ALERT);
          isValid = false;
        }

        addAlerts(newAlerts);
        return isValid;

      case 4:
        if (incomeRecords.length <= 0) {
          newAlerts.push(RECORD_AMOUNT_VALIDATION_ALERT);
          isValid = false;
        }

        if (!validateRecords(incomeRecords, ownersIDs)) {
          newAlerts.push(INCOMES_OWNERS_VALIDATION_ALERT);
          isValid = false;
        }

        addAlerts(newAlerts);
        return isValid;

      case 5:
      default:
        return false;
    }
  };

  const moveToNextPage = () => {
    if (!isValidToMoveToNextPage()) {
      return;
    }

    setPage((prevValue) => prevValue + 1);
  };

  if (habitatError) {
    console.log('Error retrieving Habitat:', habitatError.message);
  }

  function formSet() {
    if (page === 1) {
      return (
        <HouseholdForm
          applicationID={applicationID}
          householdMembers={householdMembers}
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
          ownersIDs={ownersIDs}
          addAlerts={addAlerts}
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

      <Flex direction="column">
        {alerts.length > 0 &&
          alerts.map((alert) => (
            <Alert
              key={alert.key}
              variation={alert.variation}
              hasIcon
              isDismissible
              onDismiss={() => removeAlert(alert.key)}
            >
              {alert.message}
            </Alert>
          ))}
      </Flex>

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
          onClick={moveToNextPage}
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
