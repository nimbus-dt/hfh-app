import { Alert, Button, Flex, Text } from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Modal from 'components/Modal';
import { useState } from 'react';
import { DataStore } from 'aws-amplify';
import { TestApplication } from 'models';
import dayjs from 'dayjs';
import { createAlert } from 'utils/factories';
import { CustomCard } from '../../Reusable/CustomCard';
import ApplicantInfoSection from './components/ApplicantInfoSection';
import { ChecklistSection } from './components/CheckListSection';
import WrittenSection from './components/WrittenSection';
import RecordsSection from './components/RecordsSection';
import HomeownersSection from './components/HomeownersSection';
import EmploymentSection from './components/EmploymentSection';
import FinancialSection from './components/FinancialSection';

export function TestReview() {
  const { application, setApplication } = useOutletContext();

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [alert, setAlert] = useState();

  const navigate = useNavigate();

  const handleOnClickSubmit = () => {
    setShowSubmitModal(true);
  };

  const handleOnClickSubmitModalClose = () => {
    setShowSubmitModal(false);
  };

  const handleOnClickSubmitModalAccept = async () => {
    try {
      const original = await DataStore.query(TestApplication, application.id);

      const persistedApplication = await DataStore.save(
        TestApplication.copyOf(original, (originalApplication) => {
          originalApplication.submitted = true;
          originalApplication.submittedDate = dayjs().format('YYYY-MM-DD');
        })
      );

      setApplication(persistedApplication);

      navigate('../home');
    } catch (error) {
      setAlert(
        createAlert('error', 'Error', `The application couldn't be submitted.`)
      );
    }
  };

  return (
    <Flex direction="column" gap="unset" alignItems="center" width="100%">
      {alert && (
        <Alert
          variation={alert.variation}
          heading={alert.heading}
          onDismiss={() => setAlert()}
          isDismissible
          hasIcon
        >
          {alert.body}
        </Alert>
      )}
      <ApplicantInfoSection />
      <ChecklistSection />
      <WrittenSection />
      <RecordsSection />
      <HomeownersSection />
      <EmploymentSection />
      <FinancialSection />
      <Modal
        title="Alert"
        width={{ base: '95%', medium: '30rem' }}
        open={showSubmitModal}
        onClickClose={handleOnClickSubmitModalClose}
      >
        <Text>
          Are you sure you want to submit your applicantion? Once submited you
          won't be able to resubmit.
        </Text>
        <br />
        <Flex width="100%" justifyContent="end">
          <Button variation="primary" onClick={handleOnClickSubmitModalAccept}>
            Accept
          </Button>
          <Button variation="secondary" onClick={handleOnClickSubmitModalClose}>
            Cancel
          </Button>
        </Flex>
      </Modal>
      <CustomCard>
        <Flex width="100%" justifyContent="space-between">
          <Button variation="primary" onClick={() => navigate('../financial')}>
            Back
          </Button>
          <Button variation="primary" onClick={handleOnClickSubmit}>
            Submit
          </Button>
        </Flex>
      </CustomCard>
    </Flex>
  );
}
