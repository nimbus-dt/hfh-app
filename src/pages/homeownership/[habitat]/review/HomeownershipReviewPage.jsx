import { Alert, Button, Flex, Text } from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Modal from 'components/Modal';
import { useState } from 'react';
import { DataStore } from 'aws-amplify';
import { TestApplication, SubmissionStatus } from 'models';
import dayjs from 'dayjs';
import { createAlert } from 'utils/factories';
import CustomCard from 'components/CustomCard';
import ApplicantInfoSection from './components/ApplicantInfoSection';
import { ChecklistSection } from './components/CheckListSection';
import WrittenSection from './components/WrittenSection';
import RecordsSection from './components/RecordsSection';
import HomeownersSection from './components/HomeownersSection';
import EmploymentSection from './components/EmploymentSection';
import FinancialSection from './components/FinancialSection';
import ApplicantOptionalSection from './components/ApplicantOptionalSection/ApplicantOptionalSection';

export default function HomeownershipReviewPage() {
  const { application, setApplication, openCycle } = useOutletContext();
  const [reviewedSections, setReviewedSections] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [alert, setAlert] = useState();
  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const [unmarriedAddendumOpen, setUnmarriedAddendumOpen] = useState(false);
  const [currentAddressOpen, setCurrentAddressOpen] = useState(false);
  const [previousAddressOpen, setPreviousAddressOpen] = useState(false);
  const [typeOfCreditOpen, setTypeOfCreditOpen] = useState(false);
  const [applicantMilitaryServiceOpen, setApplicantMilitaryServiceOpen] =
    useState(false);
  const [anyoneElseMilitaryServiceOpen, setAnyoneElseMilitaryServiceOpen] =
    useState(false);
  const [demographicOpen, setDemographicOpen] = useState(false);
  const [checklistExpanded, setChecklistExpanded] = useState(false);
  const [writtenExpanded, setWrittenExpanded] = useState(false);
  const [recordsExpanded, setRecordsExpanded] = useState(false);
  const [homeownersExpanded, setHomeownersExpanded] = useState(false);
  const [unemploymentOpen, setUnemploymentOpen] = useState(false);
  const [currentEmploymentOpen, setCurrentEmploymentOpen] = useState(false);
  const [previousEmploymentOpen, setPreviousEmploymentOpen] = useState(false);
  const [financialOpen, setFinancialOpen] = useState(false);

  const handleBasicInformationOnReview = (unmarried) => {
    setBasicInfoOpen(false);
    if (unmarried) {
      setUnmarriedAddendumOpen(true);
    } else {
      setCurrentAddressOpen(true);
    }
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      basicInfo: true,
    }));
  };

  const handleUnmarriedAddendumOnReview = () => {
    setUnmarriedAddendumOpen(false);
    setCurrentAddressOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      unmarriedAddendum: true,
    }));
  };

  const handleAddressOnReview = (needPreviousAddress) => {
    setCurrentAddressOpen(false);
    if (needPreviousAddress) {
      setPreviousAddressOpen(true);
    } else {
      setTypeOfCreditOpen(true);
    }
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      address: true,
    }));
  };

  const handlePreviousAddressOnReview = () => {
    setPreviousAddressOpen(false);
    setTypeOfCreditOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      prevAddress: true,
    }));
  };

  const handleTypeOfCreditOnReview = () => {
    setTypeOfCreditOpen(false);
    setApplicantMilitaryServiceOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      typeOfCredit: true,
    }));
  };

  const handleApplicantMilitaryServiceOnReview = () => {
    setApplicantMilitaryServiceOpen(false);
    setAnyoneElseMilitaryServiceOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      applicantMilitaryService: true,
    }));
  };

  const handleAnyoneElseMilitaryServiceOnReview = () => {
    setAnyoneElseMilitaryServiceOpen(false);
    setDemographicOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      anyoneElseMilitaryService: true,
    }));
  };

  const handleDemographicOnReview = () => {
    setDemographicOpen(false);
    setChecklistExpanded(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      demographic: true,
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
    setUnemploymentOpen(false);
    if (employed) {
      setCurrentEmploymentOpen(true);
    } else {
      setFinancialOpen(true);
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
    } else {
      setFinancialOpen(true);
    }
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      currentEmployment: true,
    }));
  };

  const handlePreviousEmploymentOnReview = () => {
    setPreviousEmploymentOpen(false);
    setFinancialOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      previousEmployment: true,
    }));
  };

  const handleFinancialOnReview = () => {
    setFinancialOpen(false);
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
          if (
            originalApplication.submissionStatus !== SubmissionStatus.RETURNED
          ) {
            originalApplication.testcycleID = openCycle.id;
          }
          originalApplication.submissionStatus = SubmissionStatus.SUBMITTED;
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
    setShowSubmitModal(false);
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
      {application?.submissionStatus !== SubmissionStatus.SUBMITTED && (
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
      )}
      <br />
      <ApplicantInfoSection
        basicInfoOpen={basicInfoOpen}
        setBasicInfoOpen={setBasicInfoOpen}
        handleBasicInformationOnReview={handleBasicInformationOnReview}
        unmarriedAddendumOpen={unmarriedAddendumOpen}
        setUnmarriedAddendumOpen={setUnmarriedAddendumOpen}
        handleUnmarriedAddendumOnReview={handleUnmarriedAddendumOnReview}
        currentAddressOpen={currentAddressOpen}
        setCurrentAddressOpen={setCurrentAddressOpen}
        handleAddressOnReview={handleAddressOnReview}
        previousAddressOpen={previousAddressOpen}
        setPreviousAddressOpen={setPreviousAddressOpen}
        handlePreviousAddressOnReview={handlePreviousAddressOnReview}
        typeOfCreditOpen={typeOfCreditOpen}
        setTypeOfCreditOpen={setTypeOfCreditOpen}
        handleTypeOfCreditOnReview={handleTypeOfCreditOnReview}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        submitted={application?.submissionStatus === SubmissionStatus.SUBMITTED}
      />
      <ApplicantOptionalSection
        applicantMilitaryServiceOpen={applicantMilitaryServiceOpen}
        setApplicantMilitaryServiceOpen={setApplicantMilitaryServiceOpen}
        handleApplicantMilitaryServiceOnReview={
          handleApplicantMilitaryServiceOnReview
        }
        anyoneElseMilitaryServiceOpen={anyoneElseMilitaryServiceOpen}
        setAnyoneElseMilitaryServiceOpen={setAnyoneElseMilitaryServiceOpen}
        handleAnyoneElseMilitaryServiceOnReview={
          handleAnyoneElseMilitaryServiceOnReview
        }
        demographicOpen={demographicOpen}
        setDemographicOpen={setDemographicOpen}
        handleDemographicOnReview={handleDemographicOnReview}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        submitted={application?.submissionStatus === SubmissionStatus.SUBMITTED}
      />
      <ChecklistSection
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        expanded={checklistExpanded}
        setExpanded={setChecklistExpanded}
        onReview={handleChecklistOnReview}
        submitted={application?.submissionStatus === SubmissionStatus.SUBMITTED}
      />
      <WrittenSection
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        expanded={writtenExpanded}
        setExpanded={setWrittenExpanded}
        onReview={handleWrittenOnReview}
        submitted={application?.submissionStatus === SubmissionStatus.SUBMITTED}
      />
      <RecordsSection
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        expanded={recordsExpanded}
        setExpanded={setRecordsExpanded}
        onReview={handleRecordsOnReview}
        submitted={application?.submissionStatus === SubmissionStatus.SUBMITTED}
      />
      <HomeownersSection
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        expanded={homeownersExpanded}
        setExpanded={setHomeownersExpanded}
        onReview={handleHomeownersOnReview}
        submitted={application?.submissionStatus === SubmissionStatus.SUBMITTED}
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
        submitted={application?.submissionStatus === SubmissionStatus.SUBMITTED}
      />
      <FinancialSection
        expanded={financialOpen}
        setExpanded={setFinancialOpen}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        onReview={handleFinancialOnReview}
        submitted={application?.submissionStatus === SubmissionStatus.SUBMITTED}
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
      {application?.submissionStatus !== SubmissionStatus.SUBMITTED && (
        <CustomCard>
          <Flex width="100%" justifyContent="space-between">
            <Button
              variation="primary"
              onClick={() => navigate('../financial')}
            >
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
      )}
    </Flex>
  );
}
