import { Alert, Button, Flex, Text } from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Modal from 'components/Modal';
import { useEffect, useState } from 'react';
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
import PropertySection from './components/PropertySection';

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
  const [coApplicantOpen, setCoApplicantOpen] = useState(false);
  const [coApplicantBasicInfoOpen, setCoApplicantBasicInfoOpen] =
    useState(false);
  const [
    coApplicantUnmarriedAddendumOpen,
    setCoApplicantUnmarriedAddendumOpen,
  ] = useState(false);
  const [coApplicantCurrentAddressOpen, setCoApplicantCurrentAddressOpen] =
    useState(false);
  const [coApplicantPreviousAddressOpen, setCoApplicantPreviousAddressOpen] =
    useState(false);
  const [applicantMilitaryServiceOpen, setApplicantMilitaryServiceOpen] =
    useState(false);
  const [anyoneElseMilitaryServiceOpen, setAnyoneElseMilitaryServiceOpen] =
    useState(false);
  const [demographicOpen, setDemographicOpen] = useState(false);
  const [coApplicantDemographicOpen, setCoApplicantDemographicOpen] =
    useState(false);
  const [checklistExpanded, setChecklistExpanded] = useState(false);
  const [writtenExpanded, setWrittenExpanded] = useState(false);
  const [recordsExpanded, setRecordsExpanded] = useState(false);
  const [homeownersExpanded, setHomeownersExpanded] = useState(false);
  const [unemploymentOpen, setUnemploymentOpen] = useState(false);
  const [businessOwnerOrSelfEmployedOpen, setBusinessOwnerOrSelfEmployedOpen] =
    useState(false);
  const [currentEmploymentOpen, setCurrentEmploymentOpen] = useState(false);
  const [previousEmploymentOpen, setPreviousEmploymentOpen] = useState(false);
  const [coApplicantUnemploymentOpen, setCoApplicantUnemploymentOpen] =
    useState(false);
  const [
    coApplicantBusinessOwnerOrSelfEmployedOpen,
    setCoApplicantBusinessOwnerOrSelfEmployedOpen,
  ] = useState(false);
  const [
    coApplicantCurrentEmploymentOpen,
    setCoApplicantCurrentEmploymentOpen,
  ] = useState(false);
  const [
    coApplicantPreviousEmploymentOpen,
    setCoApplicantPreviousEmploymentOpen,
  ] = useState(false);
  const [landOwnershipOpen, setLandOwnershipOpen] = useState(false);
  const [mortgageOpen, setMortgageOpen] = useState(false);
  const [realStateOwnershipOpen, setRealStateOwnershipOpen] = useState(false);
  const [rentPaymentOpen, setRentPaymentOpen] = useState(false);
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
    setCoApplicantOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      typeOfCredit: true,
    }));
  };

  const handleCoApplicantOnReview = (hasCoApplicant) => {
    setCoApplicantOpen(false);
    if (hasCoApplicant) {
      setCoApplicantBasicInfoOpen(true);
    } else {
      setApplicantMilitaryServiceOpen(true);
    }
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      coApplicant: true,
    }));
  };

  const handleCoApplicantBasicInformationOnReview = (unmarried) => {
    setCoApplicantBasicInfoOpen(false);
    if (unmarried) {
      setCoApplicantUnmarriedAddendumOpen(true);
    } else {
      setCoApplicantCurrentAddressOpen(true);
    }
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      coApplicantBasicInfo: true,
    }));
  };

  const handleCoApplicantUnmarriedAddendumOnReview = () => {
    setCoApplicantUnmarriedAddendumOpen(false);
    setCoApplicantCurrentAddressOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      coApplicantUnmarriedAddendum: true,
    }));
  };

  const handleCoApplicantAddressOnReview = (needPreviousAddress) => {
    setCoApplicantCurrentAddressOpen(false);
    if (needPreviousAddress) {
      setCoApplicantPreviousAddressOpen(true);
    } else {
      setApplicantMilitaryServiceOpen(true);
    }
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      coApplicantAddress: true,
    }));
  };

  const handleCoApplicantPreviousAddressOnReview = () => {
    setCoApplicantPreviousAddressOpen(false);
    setApplicantMilitaryServiceOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      coApplicantPrevAddress: true,
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

  const handleDemographicOnReview = (hasCoApplicant) => {
    setDemographicOpen(false);
    if (hasCoApplicant) {
      setCoApplicantDemographicOpen(true);
    } else {
      setChecklistExpanded(true);
    }
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      demographic: true,
    }));
  };

  const handleCoApplicantDemographicOnReview = () => {
    setCoApplicantDemographicOpen(false);
    setChecklistExpanded(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      coApplicantDemographic: true,
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

  const handleUnemploymentOnReview = () => {
    setUnemploymentOpen(false);
    setBusinessOwnerOrSelfEmployedOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      unemployment: true,
    }));
  };

  const handleBusinessOwnerOrSelfEmployedOnReview = (
    employed,
    hasCoApplicant
  ) => {
    setBusinessOwnerOrSelfEmployedOpen(false);
    if (employed) {
      setCurrentEmploymentOpen(true);
    } else if (hasCoApplicant) {
      setCoApplicantUnemploymentOpen(true);
    } else {
      setRealStateOwnershipOpen(true);
    }

    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      businessOwnerOrSelfEmployed: true,
    }));
  };

  const handleCurrentEmploymentOnReview = (
    hasPreviousEmployment,
    hasCoApplicant
  ) => {
    setCurrentEmploymentOpen(false);
    if (hasPreviousEmployment) {
      setPreviousEmploymentOpen(true);
    } else if (hasCoApplicant) {
      setCoApplicantUnemploymentOpen(true);
    } else {
      setRealStateOwnershipOpen(true);
    }
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      currentEmployment: true,
    }));
  };

  const handlePreviousEmploymentOnReview = (hasCoApplicant) => {
    setPreviousEmploymentOpen(false);
    if (hasCoApplicant) {
      setCoApplicantUnemploymentOpen(true);
    } else {
      setRealStateOwnershipOpen(true);
    }
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      previousEmployment: true,
    }));
  };

  const handleCoApplicantUnemploymentOnReview = () => {
    setCoApplicantUnemploymentOpen(false);
    setCoApplicantBusinessOwnerOrSelfEmployedOpen(true);

    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      coApplicantUnemployment: true,
    }));
  };

  const handleCoApplicantBusinessOwnerOrSelfEmployedOnReview = (employed) => {
    setCoApplicantBusinessOwnerOrSelfEmployedOpen(false);
    if (employed) {
      setCoApplicantCurrentEmploymentOpen(true);
    } else {
      setRealStateOwnershipOpen(true);
    }

    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      coApplicantBusinessOwnerOrSelfEmployed: true,
    }));
  };

  const handleCoApplicantCurrentEmploymentOnReview = (
    hasPreviousEmployment
  ) => {
    setCoApplicantCurrentEmploymentOpen(false);
    if (hasPreviousEmployment) {
      setCoApplicantPreviousEmploymentOpen(true);
    } else {
      setRealStateOwnershipOpen(true);
    }
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      coApplicantCurrentEmployment: true,
    }));
  };

  const handleCoApplicantPreviousEmploymentOnReview = () => {
    setCoApplicantPreviousEmploymentOpen(false);
    setRealStateOwnershipOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      coApplicantPreviousEmployment: true,
    }));
  };

  const handleRealStateOwnershipOnReview = (hasRealState) => {
    setRealStateOwnershipOpen(false);
    if (hasRealState) {
      setMortgageOpen(true);
    } else {
      setRentPaymentOpen(true);
    }
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      ownRealState: true,
    }));
  };

  const handleMortgageOnReview = () => {
    setMortgageOpen(false);
    setLandOwnershipOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      mortgagePayment: true,
    }));
  };

  const handleLandOwnershipOnReview = () => {
    setLandOwnershipOpen(false);
    setFinancialOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      landOwnership: true,
    }));
  };

  const handleRentPaymentOnReview = () => {
    setRentPaymentOpen(false);
    setFinancialOpen(true);
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      rentPayment: true,
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

  useEffect(() => console.log('reviews', reviewedSections), [reviewedSections]);

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
        coApplicantOpen={coApplicantOpen}
        setCoApplicantOpen={setCoApplicantOpen}
        handleCoApplicantOnReview={handleCoApplicantOnReview}
        coApplicantBasicInfoOpen={coApplicantBasicInfoOpen}
        setCoApplicantBasicInfoOpen={setCoApplicantBasicInfoOpen}
        handleCoApplicantBasicInformationOnReview={
          handleCoApplicantBasicInformationOnReview
        }
        coApplicantUnmarriedAddendumOpen={coApplicantUnmarriedAddendumOpen}
        setCoApplicantUnmarriedAddendumOpen={
          setCoApplicantUnmarriedAddendumOpen
        }
        handleCoApplicantUnmarriedAddendumOnReview={
          handleCoApplicantUnmarriedAddendumOnReview
        }
        coApplicantCurrentAddressOpen={coApplicantCurrentAddressOpen}
        setCoApplicantCurrentAddressOpen={setCoApplicantCurrentAddressOpen}
        handleCoApplicantAddressOnReview={handleCoApplicantAddressOnReview}
        coApplicantPreviousAddressOpen={coApplicantPreviousAddressOpen}
        setCoApplicantPreviousAddressOpen={setCoApplicantPreviousAddressOpen}
        handleCoApplicantPreviousAddressOnReview={
          handleCoApplicantPreviousAddressOnReview
        }
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
        coApplicantDemographicOpen={coApplicantDemographicOpen}
        setCoApplicantDemographicOpen={setCoApplicantDemographicOpen}
        handleCoApplicantDemographicOnReview={
          handleCoApplicantDemographicOnReview
        }
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
        unemploymentOpen={unemploymentOpen}
        setUnemploymentOpen={setUnemploymentOpen}
        handleUnemploymentOnReview={handleUnemploymentOnReview}
        businessOwnerOrSelfEmployedOpen={businessOwnerOrSelfEmployedOpen}
        setBusinessOwnerOrSelfEmployedOpen={setBusinessOwnerOrSelfEmployedOpen}
        handleBusinessOwnerOrSelfEmployedOnReview={
          handleBusinessOwnerOrSelfEmployedOnReview
        }
        currentEmploymentOpen={currentEmploymentOpen}
        setCurrentEmploymentOpen={setCurrentEmploymentOpen}
        handleCurrentEmploymentOnReview={handleCurrentEmploymentOnReview}
        previousEmploymentOpen={previousEmploymentOpen}
        setPreviousEmploymentOpen={setPreviousEmploymentOpen}
        handlePreviousAddressOnReview={handlePreviousEmploymentOnReview}
        coApplicantUnemploymentOpen={coApplicantUnemploymentOpen}
        setCoApplicantUnemploymentOpen={setCoApplicantUnemploymentOpen}
        handleCoApplicantUnemploymentOnReview={
          handleCoApplicantUnemploymentOnReview
        }
        coApplicantBusinessOwnerOrSelfEmployedOpen={
          coApplicantBusinessOwnerOrSelfEmployedOpen
        }
        setCoApplicantBusinessOwnerOrSelfEmployedOpen={
          setCoApplicantBusinessOwnerOrSelfEmployedOpen
        }
        handleCoApplicantBusinessOwnerOrSelfEmployedOnReview={
          handleCoApplicantBusinessOwnerOrSelfEmployedOnReview
        }
        coApplicantCurrentEmploymentOpen={coApplicantCurrentEmploymentOpen}
        setCoApplicantCurrentEmploymentOpen={
          setCoApplicantCurrentEmploymentOpen
        }
        handleCoApplicantCurrentEmploymentOnReview={
          handleCoApplicantCurrentEmploymentOnReview
        }
        coApplicantPreviousEmploymentOpen={coApplicantPreviousEmploymentOpen}
        setCoApplicantPreviousEmploymentOpen={
          setCoApplicantPreviousEmploymentOpen
        }
        handleCoApplicantPreviousAddressOnReview={
          handleCoApplicantPreviousEmploymentOnReview
        }
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        submitted={application?.submissionStatus === SubmissionStatus.SUBMITTED}
      />
      <PropertySection
        landOwnershipOpen={landOwnershipOpen}
        setLandOwnershipOpen={setLandOwnershipOpen}
        handleLandOwnershipOnReview={handleLandOwnershipOnReview}
        mortgageOpen={mortgageOpen}
        setMortgageOpen={setMortgageOpen}
        handleMortgageOnReview={handleMortgageOnReview}
        realStateOwnershipOpen={realStateOwnershipOpen}
        setRealStateOwnershipOpen={setRealStateOwnershipOpen}
        handleRealStateOwnershipOnReview={handleRealStateOwnershipOnReview}
        rentPaymentOpen={rentPaymentOpen}
        setRentPaymentOpen={setRentPaymentOpen}
        handleRentPaymentOnReview={handleRentPaymentOnReview}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
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
