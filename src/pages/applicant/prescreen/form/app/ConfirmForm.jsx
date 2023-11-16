import PropTypes from 'prop-types';
import { DataStore } from 'aws-amplify';
import { Flex, Text, Button } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import ApplicationSummary from 'components/applications/ApplicationSummary';
import useCurrentAuthenticatedUser from 'hooks/services/useCurrentAuthenticatedUser';
import useUserPropsByUsername from 'hooks/services/useUserPropsByUsername';
import { Application } from 'models';
import { validateAllApplicationRecords } from 'utils/validators';
import dayjs from 'dayjs';
import { ApplicationRecordTypes } from 'utils/constants';
import {
  DEBTS_OWNERS_VALIDATION_ALERT,
  GENERAL_OWNERS_VALIDATION_ALERT,
  INCOMES_OWNERS_VALIDATION_ALERT,
  SAVINGS_OWNERS_VALIDATION_ALERT,
} from './alerts';

export function ConfirmForm({
  application,
  householdMembers,
  savingRecords,
  debtRecords,
  incomeRecords,
  ownersIDs,
  addAlerts,
}) {
  const { currentUser } = useCurrentAuthenticatedUser();
  const { userProps } = useUserPropsByUsername({
    username: currentUser?.username,
    dependencyArray: [currentUser?.username],
  });
  const formData = {
    name: userProps?.name,
    dob: userProps?.dob,
    sex: userProps?.sex,
    phone: userProps?.phone,
    address: userProps?.address,
    zip: userProps?.zip,
    email: userProps?.email,
  };
  const navigate = useNavigate();
  const isAnySectionEmpty =
    householdMembers.length <= 0 ||
    savingRecords.length <= 0 ||
    debtRecords.length <= 0 ||
    incomeRecords.length <= 0;

  async function submitApplication() {
    if (isAnySectionEmpty) {
      return;
    }

    const recordsValidation = validateAllApplicationRecords({
      incomeRecords,
      savingRecords,
      debtRecords,
      ownersIDs,
    });

    if (!recordsValidation.areAllValid) {
      const newAlerts = recordsValidation.invalidRecordTypes.map(
        (recordType) => {
          switch (recordType) {
            case ApplicationRecordTypes.SAVING:
              return SAVINGS_OWNERS_VALIDATION_ALERT;
            case ApplicationRecordTypes.DEBT:
              return DEBTS_OWNERS_VALIDATION_ALERT;
            case ApplicationRecordTypes.INCOME:
              return INCOMES_OWNERS_VALIDATION_ALERT;
            default:
              return GENERAL_OWNERS_VALIDATION_ALERT;
          }
        }
      );

      addAlerts(newAlerts);
      return;
    }

    try {
      await DataStore.save(
        Application.copyOf(application, (updated) => {
          updated.submitted = true;
          updated.ownerName = `${formData.name}`;
          updated.submittedStatus = 'PENDING';
          updated.dateSubmitted = dayjs().format('YYYY-MM-DD');
          // Include other properties that need to be updated
        })
      );

      navigate('../apps');
    } catch (error) {
      console.log(`Error submitting application: ${error}`);
    }
  }

  return (
    <Flex width="100%" direction="column">
      <ApplicationSummary
        selectedApplication={application}
        userProps={formData}
        householdMembers={householdMembers}
        incomes={incomeRecords}
        debts={debtRecords}
        savings={savingRecords}
        isEditable
      />
      <Text textAlign="center" width="100%">
        Please make sure that you have added at least ONE RECORD per available
        owner in every section to submit the application.
      </Text>

      <Button
        type="submit"
        variation="primary"
        onClick={() => {
          submitApplication();
        }}
        disabled={isAnySectionEmpty}
      >
        Submit
      </Button>
    </Flex>
  );
}

ConfirmForm.propTypes = {
  application: PropTypes.object,
  householdMembers: PropTypes.array,
  savingRecords: PropTypes.array,
  debtRecords: PropTypes.array,
  incomeRecords: PropTypes.array,
  ownersIDs: PropTypes.object,
  addAlerts: PropTypes.func,
};
