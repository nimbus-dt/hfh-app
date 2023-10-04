import PropTypes from 'prop-types';
import { DataStore } from 'aws-amplify';
import { Flex, Text, Button } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import ApplicationSummary from 'components/applications/ApplicationSummary';
import useCurrentAuthenticatedUser from 'hooks/services/useCurrentAuthenticatedUser';
import useUserPropsByUsername from 'hooks/services/useUserPropsByUsername';
import { Application } from 'models';

export function ConfirmForm({
  application,
  householdMembers,
  savingRecords,
  debtRecords,
  incomeRecords,
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

    const current = new Date();
    const currentDate = current.toISOString();
    const cutDate = currentDate.substring(0, 10);

    try {
      await DataStore.save(
        Application.copyOf(application, (updated) => {
          updated.submitted = true;
          updated.ownerName = `${formData.name}`;
          updated.submittedStatus = 'PENDING';
          updated.dateSubmitted = cutDate;
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
        Please make sure that you have added at least ONE RECORD per section. If
        you have not, your application will not be considered.
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
};
