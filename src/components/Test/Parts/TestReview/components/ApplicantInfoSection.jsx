import {
  RadioGroupField,
  TextField,
  Radio,
  Button,
  Flex,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ApplicantInfo } from 'models';
import { DataStore } from 'aws-amplify';
import { getCheckOrExEmoji } from 'utils/misc';
import { CustomExpandableCard } from '../../../Reusable/CustomExpandableCard';
import {
  maritalStatusValues,
  ownerShipValues,
  unmarriedRelationshipTypesValues,
} from '../../TestApplicantInfo/aplicantInfo.schema';
import LoadingData from './LoadingData';

const editRoute = '../applicant-info';

function BasicInformation({
  applicantInfo,
  expanded,
  onExpandedChange,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
}) {
  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      basicInfo: false,
    }));
  }, [setReviewedSections]);

  const customCardReference = useRef(null);

  useEffect(() => {
    if (expanded) {
      customCardReference.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [expanded]);

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        reviewedSections.basicInfo || submitted
      )} Basic Information`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      {applicantInfo === undefined ? (
        <LoadingData />
      ) : (
        <>
          <TextField
            label="What is your full name?"
            value={applicantInfo.props.basicInfo.fullName}
            isDisabled
          />
          <br />
          <TextField
            label="If you have an alternative or a former name, please write it here."
            value={applicantInfo.props.basicInfo.altOrFormerName}
            isDisabled
          />
          <br />
          <TextField
            label="What is your social security number?"
            value={applicantInfo.props.basicInfo.socialSecurityNumber}
            isDisabled
          />
          <br />
          <TextField
            label="What is your home phone?"
            value={applicantInfo.props.basicInfo.homePhone}
            isDisabled
          />
          <br />
          <TextField
            label="What is your cell phone?"
            value={applicantInfo.props.basicInfo.cellPhone}
            isDisabled
          />
          <br />
          <TextField
            label="What is your work phone?"
            value={applicantInfo.props.basicInfo.workPhone}
            isDisabled
          />
          <br />
          <TextField
            label="What is your date of birth?"
            type="date"
            value={applicantInfo.props.basicInfo.birthDate}
            isDisabled
          />
          <br />

          <RadioGroupField
            label="Which of these best represents your current marital status?"
            value={applicantInfo.props.basicInfo.maritalStatus}
            isDisabled
          >
            {maritalStatusValues.map((maritalStatus) => (
              <Radio key={maritalStatus} value={maritalStatus}>
                {maritalStatus}
              </Radio>
            ))}
          </RadioGroupField>
          <br />
          {!submitted && (
            <Flex width="100%" justifyContent="end">
              <Link to={editRoute}>
                <Button>Edit</Button>
              </Link>
              <Button variation="primary" onClick={onReview}>
                Confirm
              </Button>
            </Flex>
          )}
        </>
      )}
    </CustomExpandableCard>
  );
}

BasicInformation.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

export function UnmarriedAddendum({
  expanded,
  onExpandedChange,
  applicantInfo,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
}) {
  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      unmarriedAddendum: false,
    }));
  }, [setReviewedSections]);

  const customCardReference = useRef(null);

  useEffect(() => {
    if (expanded) {
      customCardReference.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [expanded]);

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        reviewedSections.unmarriedAddendum || submitted
      )} Unmarried Addendum`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      <RadioGroupField
        name="notSpouseButSimilarPropertyRights"
        label="Which of these best represents the ownership status of the previous address you lived in?"
        defaultValue={
          applicantInfo?.props.unmarriedAddendum
            ?.notSpouseButSimilarPropertyRights
        }
        isDisabled
      >
        <Radio value="No">No</Radio>
        <Radio value="Yes">Yes</Radio>
      </RadioGroupField>

      <br />
      {applicantInfo?.props.unmarriedAddendum
        ?.notSpouseButSimilarPropertyRights === 'Yes' && (
        <>
          <RadioGroupField
            name="relationshipType"
            label="Which of these best represents the ownership status of the previous address you lived in?"
            value={applicantInfo?.props.unmarriedAddendum?.relationshipType}
            isDisabled
          >
            {unmarriedRelationshipTypesValues.map(
              (unmarriedRelationshipType) => (
                <Radio
                  key={unmarriedRelationshipType}
                  value={unmarriedRelationshipType}
                >
                  {unmarriedRelationshipType}
                </Radio>
              )
            )}
          </RadioGroupField>
          <br />
          {applicantInfo?.props.unmarriedAddendum?.relationshipType ===
            'Other' && (
            <>
              <TextField
                label="Explain the relationship"
                defaultValue={
                  applicantInfo?.props.unmarriedAddendum?.otherRelationshipType
                }
                isDisabled
              />
              <br />
            </>
          )}
          <TextField
            label="State in which the relationship was formed"
            defaultValue={applicantInfo?.props.unmarriedAddendum?.state}
            isDisabled
          />
          <br />
        </>
      )}
      {!submitted && (
        <Flex width="100%" justifyContent="end">
          <Link to={editRoute}>
            <Button>Edit</Button>
          </Link>
          <Button variation="primary" onClick={onReview}>
            Confirm
          </Button>
        </Flex>
      )}
    </CustomExpandableCard>
  );
}

UnmarriedAddendum.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

const Address = ({
  expanded,
  onExpandedChange,
  applicantInfo,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
}) => {
  const customCardReference = useRef(null);

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      address: false,
    }));
  }, [setReviewedSections]);

  useEffect(() => {
    if (expanded) {
      customCardReference.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [expanded]);

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        reviewedSections.address || submitted
      )} Present Address`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      {applicantInfo === undefined ? (
        <LoadingData />
      ) : (
        <>
          <TextField
            label="What is your present address?"
            value={applicantInfo.props.currentAddress.address}
            isDisabled
          />
          <br />
          <TextField
            label="How long have you lived at this address, in months?"
            type="number"
            value={applicantInfo.props.currentAddress.monthsLivedHere}
            isDisabled
          />
          <br />

          <RadioGroupField
            label="Which of these best represents the ownership status of the address you currently live in?"
            value={applicantInfo.props.currentAddress.ownershipStatus}
            isDisabled
          >
            {ownerShipValues.map((ownerShip) => (
              <Radio key={ownerShip} value={ownerShip}>
                {ownerShip}
              </Radio>
            ))}
          </RadioGroupField>
          {!submitted && (
            <Flex width="100%" justifyContent="end">
              <Link to={editRoute}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={onReview} variation="primary">
                Confirm
              </Button>
            </Flex>
          )}
        </>
      )}
    </CustomExpandableCard>
  );
};

Address.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

function PrevAddress({
  expanded,
  onExpandedChange,
  applicantInfo,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
}) {
  const customCardReference = useRef(null);

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      prevAddress: false,
    }));
  }, [setReviewedSections]);

  useEffect(() => {
    if (expanded) {
      customCardReference.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [expanded]);

  useEffect(() => console.log(applicantInfo), [applicantInfo]);

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(
        reviewedSections.prevAddress || submitted
      )} Previous Address`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      {applicantInfo === undefined ? (
        <LoadingData />
      ) : (
        <>
          <TextField
            label="What is your previous address?"
            value={applicantInfo.props.previousAddress.address}
            isDisabled
          />
          <br />
          <TextField
            label="How long did you live at this address, in months?"
            type="number"
            value={applicantInfo.props.previousAddress.monthsLivedHere}
            isDisabled
          />
          <br />
          <RadioGroupField
            name="ownershipStatus"
            label="Which of these best represents the ownership status of the previous address you lived in?"
            value={applicantInfo.props.previousAddress.ownershipStatus}
            isDisabled
          >
            {ownerShipValues.map((ownerShip) => (
              <Radio key={ownerShip} value={ownerShip}>
                {ownerShip}
              </Radio>
            ))}
          </RadioGroupField>

          {!submitted && (
            <Flex width="100%" justifyContent="end">
              <Link to={editRoute}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={onReview} variation="primary">
                Confirm
              </Button>
            </Flex>
          )}
        </>
      )}
    </CustomExpandableCard>
  );
}

PrevAddress.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

const ApplicantInfoSection = ({
  basicInfoOpen,
  setBasicInfoOpen,
  handleBasicInformationOnReview,
  unmarriedAddendumOpen,
  setUnmarriedAddendumOpen,
  handleUnmarriedAddendumOnReview,
  currentAddressOpen,
  setCurrentAddressOpen,
  handleAddressOnReview,
  previousAddressOpen,
  setPreviousAddressOpen,
  handlePreviousAddressOnReview,
  reviewedSections,
  setReviewedSections,
  submitted,
}) => {
  const { application, habitat } = useOutletContext();

  const [applicantInfo, setApplicantInfo] = useState();

  useEffect(() => {
    const getApplicationInfo = async (applicationID) => {
      try {
        const existingApplicantInfo = await DataStore.query(
          ApplicantInfo,
          (c) => c.ownerID.eq(applicationID)
        );
        setApplicantInfo(existingApplicantInfo[0]);
      } catch (error) {
        console.log('Error fetching the applicant info data.');
      }
    };
    if (application) {
      getApplicationInfo(application.id);
    }
  }, [application]);

  return (
    <>
      <BasicInformation
        expanded={basicInfoOpen}
        onExpandedChange={setBasicInfoOpen}
        applicantInfo={applicantInfo}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        onReview={() =>
          handleBasicInformationOnReview(
            applicantInfo?.props?.unmarriedAddendum
          )
        }
        submitted={submitted}
      />
      <br />
      {applicantInfo?.props?.unmarriedAddendum && (
        <>
          <UnmarriedAddendum
            expanded={unmarriedAddendumOpen}
            onExpandedChange={setUnmarriedAddendumOpen}
            applicantInfo={applicantInfo}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={handleUnmarriedAddendumOnReview}
            submitted={submitted}
          />
          <br />
        </>
      )}
      <Address
        expanded={currentAddressOpen}
        onExpandedChange={setCurrentAddressOpen}
        applicantInfo={applicantInfo}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        onReview={() =>
          handleAddressOnReview(
            applicantInfo?.props?.currentAddress?.monthsLivedHere <
              habitat?.props.minCurrentAddressMonths
          )
        }
        submitted={submitted}
      />
      <br />
      {applicantInfo?.props?.previousAddress && (
        <>
          <PrevAddress
            expanded={previousAddressOpen}
            onExpandedChange={setPreviousAddressOpen}
            applicantInfo={applicantInfo}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={handlePreviousAddressOnReview}
            submitted={submitted}
          />
          <br />
        </>
      )}
    </>
  );
};

ApplicantInfoSection.propTypes = {
  basicInfoOpen: PropTypes.bool,
  setBasicInfoOpen: PropTypes.func,
  handleBasicInformationOnReview: PropTypes.func,
  unmarriedAddendumOpen: PropTypes.bool,
  setUnmarriedAddendumOpen: PropTypes.func,
  handleUnmarriedAddendumOnReview: PropTypes.func,
  currentAddressOpen: PropTypes.bool,
  setCurrentAddressOpen: PropTypes.func,
  handleAddressOnReview: PropTypes.func,
  previousAddressOpen: PropTypes.bool,
  setPreviousAddressOpen: PropTypes.func,
  handlePreviousAddressOnReview: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  submitted: PropTypes.bool,
};

export default ApplicantInfoSection;
