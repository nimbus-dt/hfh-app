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
  const [reviewedSections, setReviewedSections] = useState({});

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [alert, setAlert] = useState();
  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const [currentAddressOpen, setCurrentAddressOpen] = useState(false);
  const [previousAddressOpen, setPreviousAddressOpen] = useState(false);
  const [checklistExpanded, setChecklistExpanded] = useState(false);
  const [writtenExpanded, setWrittenExpanded] = useState(false);
  const [recordsExpanded, setRecordsExpanded] = useState(false);
  const [homeownersExpanded, setHomeownersExpanded] = useState(false);
  const [unemploymentOpen, setUnemploymentOpen] = useState(false);
  const [currentEmploymentOpen, setCurrentEmploymentOpen] = useState(false);
  const [previousEmploymentOpen, setPreviousEmploymentOpen] = useState(false);

  const handleBasicInformationOnReview = () => {
    setBasicInfoOpen(false);
    setCurrentAddressOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      basicInfo: true,
    }));
  };

  const handleAddressOnReview = () => {
    setCurrentAddressOpen(false);
    setPreviousAddressOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      address: true,
    }));
  };

  const handlePreviousAddressOnReview = () => {
    setPreviousAddressOpen(false);
    setChecklistExpanded(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      prevAddress: true,
    }));
  };

  const handleChecklistOnReview = () => {
    setChecklistExpanded(false);
    setWrittenExpanded(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      checklist: true,
    }));
  };

  const handleWrittenOnReview = () => {
    setWrittenExpanded(false);
    setRecordsExpanded(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      written: true,
    }));
  };

  const handleRecordsOnReview = () => {
    setRecordsExpanded(false);
    setHomeownersExpanded(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      records: true,
    }));
  };

  const handleHomeownersOnReview = () => {
    setHomeownersExpanded(false);
    setUnemploymentOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      homeowners: true,
    }));
  };

  const handleUnemploymentOnReview = (employed) => {
    console.log(employed);
    setUnemploymentOpen(false);
    if (employed) {
      setCurrentEmploymentOpen(true);
    }
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      unemployment: true,
    }));
  };

  const handleCurrentEmploymentOnReview = (hasPreviousEmployment) => {
    setCurrentEmploymentOpen(false);
    if (hasPreviousEmployment) {
      setPreviousEmploymentOpen(true);
    }
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      currentEmployment: true,
    }));
  };

  const handlePreviousEmploymentOnReview = () => {
    setPreviousEmploymentOpen(false);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      previousEmployment: true,
    }));
  };

  const handleFinancialOnReview = () => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      financial: true,
    }));
  };

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

  const isDisabled = () => {
    for (const [, value] of Object.entries(reviewedSections)) {
      if (!value) {
        return true;
      }
    }
    return false;
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
      <CustomCard>
        <Text>
          Before submitting your application,{' '}
          <Text as="span" fontWeight="bold">
            please review the information you've submitted
          </Text>{' '}
          for accuracy and completeness.{' '}
          <Text as="span" fontWeight="bold">
            Click confirm
          </Text>{' '}
          on each of the sections below before submitting.
        </Text>
      </CustomCard>
      <br />
      <ApplicantInfoSection
        basicInfoOpen={basicInfoOpen}
        setBasicInfoOpen={setBasicInfoOpen}
        handleBasicInformationOnReview={handleBasicInformationOnReview}
        currentAddressOpen={currentAddressOpen}
        setCurrentAddressOpen={setCurrentAddressOpen}
        handleAddressOnReview={handleAddressOnReview}
        previousAddressOpen={previousAddressOpen}
        setPreviousAddressOpen={setPreviousAddressOpen}
        handlePreviousAddressOnReview={handlePreviousAddressOnReview}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
      />
      <ChecklistSection
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        expanded={checklistExpanded}
        setExpanded={setChecklistExpanded}
        onReview={handleChecklistOnReview}
      />
      <WrittenSection
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        expanded={writtenExpanded}
        setExpanded={setWrittenExpanded}
        onReview={handleWrittenOnReview}
      />
      <RecordsSection
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        expanded={recordsExpanded}
        setExpanded={setRecordsExpanded}
        onReview={handleRecordsOnReview}
      />
      <HomeownersSection
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        expanded={homeownersExpanded}
        setExpanded={setHomeownersExpanded}
        onReview={handleHomeownersOnReview}
      />
      <EmploymentSection
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        unemploymentOpen={unemploymentOpen}
        setUnemploymentOpen={setUnemploymentOpen}
        currentEmploymentOpen={currentEmploymentOpen}
        setCurrentEmploymentOpen={setCurrentEmploymentOpen}
        previousEmploymentOpen={previousEmploymentOpen}
        setPreviousEmploymentOpen={setPreviousEmploymentOpen}
        handleUnemploymentOnReview={handleUnemploymentOnReview}
        handleCurrentEmploymentOnReview={handleCurrentEmploymentOnReview}
        handlePreviousAddressOnReview={handlePreviousEmploymentOnReview}
      />
      <FinancialSection
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        onReview={handleFinancialOnReview}
      />
      <Modal
        title="Alert"
        width={{ base: '95%', medium: '30rem' }}
        open={showSubmitModal}
        onClickClose={handleOnClickSubmitModalClose}
      >
        <Text>
          Are you sure you want to submit your application? Once submited you
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
          <Button
            variation="primary"
            onClick={handleOnClickSubmit}
            isDisabled={isDisabled()}
          >
            Submit
          </Button>
        </Flex>
      </CustomCard>
    </Flex>
  );
}
