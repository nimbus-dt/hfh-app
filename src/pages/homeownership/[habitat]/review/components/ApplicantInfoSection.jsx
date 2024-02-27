import {
  RadioGroupField,
  TextField,
  Radio,
  Button,
  Flex,
  SelectField,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ApplicantInfo } from 'models';
import { DataStore } from 'aws-amplify';
import { getCheckOrExEmoji } from 'utils/misc';
import CustomExpandableCard from 'components/CustomExpandableCard';

import SearchableSelectInput from 'components/SearchableSelectInput';
import LoadingData from './LoadingData';
import {
  creditTypes,
  maritalStatusValues,
  ownerShipValues,
  unmarriedRelationshipTypesValues,
} from '../../applicant-info/HomeownershipApplicantInfoPage.schema';
import states from '../../../../../assets/jsons/states.json';

const editRoute = '../applicant-info';

function BasicInformation({
  applicantInfo,
  expanded,
  onExpandedChange,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
  coApplicant,
}) {
  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      ...(coApplicant ? { coApplicantBasicInfo: false } : { basicInfo: false }),
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
        coApplicant
          ? reviewedSections.coApplicantBasicInfo
          : reviewedSections.basicInfo || submitted
      )}${coApplicant ? ' Co-applicant' : ''} Basic Information`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      {applicantInfo === undefined ? (
        <LoadingData />
      ) : (
        <>
          <TextField
            label={
              coApplicant
                ? "What is the co-applicant's full name?"
                : 'What is your full name?'
            }
            value={
              coApplicant
                ? applicantInfo.props.coApplicantBasicInfo.fullName
                : applicantInfo.props.basicInfo.fullName
            }
            isDisabled
          />
          <br />
          <TextField
            label={
              coApplicant
                ? 'If the co-applicant have an alternative or a former name, please write it here.'
                : 'If you have an alternative or a former name, please write it here.'
            }
            value={
              coApplicant
                ? applicantInfo.props.coApplicantBasicInfo.altOrFormerName
                : applicantInfo.props.basicInfo.altOrFormerName
            }
            isDisabled
          />
          <br />
          <TextField
            label={
              coApplicant
                ? "What is the co-applicant's social security number?"
                : 'What is your social security number?'
            }
            value={
              coApplicant
                ? applicantInfo.props.coApplicantBasicInfo.socialSecurityNumber
                : applicantInfo.props.basicInfo.socialSecurityNumber
            }
            isDisabled
          />
          <br />
          <TextField
            label={
              coApplicant
                ? "What is the co-applicant's home phone?"
                : 'What is your home phone?'
            }
            value={
              coApplicant
                ? applicantInfo.props.coApplicantBasicInfo.homePhone
                : applicantInfo.props.basicInfo.homePhone
            }
            isDisabled
          />
          <br />
          <TextField
            label={
              coApplicant
                ? "What is the co-applicant's cell phone?"
                : 'What is your cell phone?'
            }
            value={
              coApplicant
                ? applicantInfo.props.coApplicantBasicInfo.cellPhone
                : applicantInfo.props.basicInfo.cellPhone
            }
            isDisabled
          />
          <br />
          <TextField
            label={
              coApplicant
                ? "What is the co-applicant's work phone?"
                : 'What is your work phone?'
            }
            value={
              coApplicant
                ? applicantInfo.props.coApplicantBasicInfo.workPhone
                : applicantInfo.props.basicInfo.workPhone
            }
            isDisabled
          />
          <br />
          <TextField
            label={
              coApplicant
                ? "What is the co-applicant's date of birth?"
                : 'What is your date of birth?'
            }
            type="date"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantBasicInfo.birthDate
                : applicantInfo.props.basicInfo.birthDate
            }
            isDisabled
          />
          <br />

          <RadioGroupField
            label={
              coApplicant
                ? 'Which of these best represents the co-applicant current marital status?'
                : 'Which of these best represents your current marital status?'
            }
            value={
              coApplicant
                ? applicantInfo.props.coApplicantBasicInfo.maritalStatus
                : applicantInfo.props.basicInfo.maritalStatus
            }
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
  coApplicant: PropTypes.bool,
};

function UnmarriedAddendum({
  expanded,
  onExpandedChange,
  applicantInfo,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
  coApplicant,
}) {
  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      ...(coApplicant
        ? { coApplicantUnmarriedAddendum: false }
        : { unmarriedAddendum: false }),
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
        coApplicant
          ? reviewedSections.coApplicantUnmarriedAddendum
          : reviewedSections.unmarriedAddendum || submitted
      )}${coApplicant ? ' Co-applicant' : ''} Unmarried Addendum`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      <RadioGroupField
        name="notSpouseButSimilarPropertyRights"
        label={
          coApplicant
            ? "Is there a person who is not the co-applicant's legal spouse but who currently has real property rights similar to those of a legal spouse?"
            : 'Is there a person who is not your legal spouse but who currently has real property rights similar to those of a legal spouse?'
        }
        value={
          coApplicant
            ? applicantInfo?.props.coApplicantUnmarriedAddendum
                ?.notSpouseButSimilarPropertyRights
            : applicantInfo?.props.unmarriedAddendum
                ?.notSpouseButSimilarPropertyRights
        }
        isReadOnly
        isDisabled
      >
        <Radio value="No">No</Radio>
        <Radio value="Yes">Yes</Radio>
      </RadioGroupField>

      <br />
      {applicantInfo?.props[
        coApplicant ? 'coApplicantUnmarriedAddendum' : 'unmarriedAddendum'
      ]?.notSpouseButSimilarPropertyRights === 'Yes' && (
        <>
          <RadioGroupField
            label="Indicate the type of relationship"
            value={
              coApplicant
                ? applicantInfo?.props.coApplicantUnmarriedAddendum
                    ?.relationshipType
                : applicantInfo?.props.unmarriedAddendum?.relationshipType
            }
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
          {applicantInfo?.props[
            coApplicant ? 'coApplicantUnmarriedAddendum' : 'unmarriedAddendum'
          ]?.relationshipType === 'Other' && (
            <>
              <TextField
                label="Explain the relationship"
                defaultValue={
                  coApplicant
                    ? applicantInfo?.props.coApplicantUnmarriedAddendum
                        ?.otherRelationshipType
                    : applicantInfo?.props.unmarriedAddendum
                        ?.otherRelationshipType
                }
                isDisabled
              />
              <br />
            </>
          )}
          <TextField
            label="State in which the relationship was formed"
            defaultValue={
              coApplicant
                ? applicantInfo?.props.coApplicantUnmarriedAddendum?.state
                : applicantInfo?.props.unmarriedAddendum?.state
            }
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
  coApplicant: PropTypes.bool,
};

const Address = ({
  expanded,
  onExpandedChange,
  applicantInfo,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
  coApplicant,
}) => {
  const customCardReference = useRef(null);

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      ...(coApplicant ? { coApplicantAddress: false } : { address: false }),
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
        coApplicant
          ? reviewedSections.coApplicantAddress
          : reviewedSections.address || submitted
      )}${coApplicant ? ' Co-applicant' : ''} Present Address`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      {applicantInfo === undefined ? (
        <LoadingData />
      ) : (
        <>
          <SelectField
            label="State"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantCurrentAddress.state
                : applicantInfo.props.currentAddress.state
            }
            isDisabled
          >
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </SelectField>
          <br />
          <SearchableSelectInput
            label="City"
            selectedOption={{
              id: coApplicant
                ? applicantInfo.props.coApplicantCurrentAddress.city
                : applicantInfo.props.currentAddress.city,
              label: coApplicant
                ? applicantInfo.props.coApplicantCurrentAddress.city
                : applicantInfo.props.currentAddress.city,
            }}
            isDisabled
          />
          <br />
          <TextField
            label="Street"
            isDisabled
            value={
              coApplicant
                ? applicantInfo.props.coApplicantCurrentAddress.street
                : applicantInfo.props.currentAddress.street
            }
          />
          <br />
          <TextField
            label="Zip code"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantCurrentAddress.zipCode
                : applicantInfo.props.currentAddress.zipCode
            }
            isDisabled
          />
          <br />
          <TextField
            label={
              coApplicant
                ? 'How long have the co-applicant lived at this address, in months?'
                : 'How long have you lived at this address, in months?'
            }
            type="number"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantCurrentAddress.monthsLivedHere
                : applicantInfo.props.currentAddress.monthsLivedHere
            }
            isDisabled
          />
          <br />

          <RadioGroupField
            label={
              coApplicant
                ? 'Which of these best represents the ownership status of the address the co-applicant currently live in?'
                : 'Which of these best represents the ownership status of the address you currently live in?'
            }
            value={
              coApplicant
                ? applicantInfo.props.coApplicantCurrentAddress.ownershipStatus
                : applicantInfo.props.currentAddress.ownershipStatus
            }
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
  coApplicant: PropTypes.bool,
};

function PrevAddress({
  expanded,
  onExpandedChange,
  applicantInfo,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
  coApplicant,
}) {
  const customCardReference = useRef(null);

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      ...(coApplicant
        ? { prevAddress: false }
        : { coApplicantPrevAddress: false }),
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
        coApplicant
          ? reviewedSections.coApplicantPrevAddress
          : reviewedSections.prevAddress || submitted
      )}${coApplicant ? ' Co-applicant' : ''} Previous Address`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      {applicantInfo === undefined ? (
        <LoadingData />
      ) : (
        <>
          <SelectField
            label="State"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantPreviousAddress.state
                : applicantInfo.props.previousAddress.state
            }
            isDisabled
          >
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </SelectField>
          <br />
          <SearchableSelectInput
            label="City"
            selectedOption={{
              id: coApplicant
                ? applicantInfo.props.coApplicantPreviousAddress.city
                : applicantInfo.props.previousAddress.city,
              label: coApplicant
                ? applicantInfo.props.coApplicantPreviousAddress.city
                : applicantInfo.props.previousAddress.city,
            }}
            isDisabled
          />
          <br />
          <TextField
            label="Street"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantPreviousAddress.street
                : applicantInfo.props.previousAddress.street
            }
            isDisabled
          />
          <br />
          <TextField
            label="Zip code"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantPreviousAddress.zipCode
                : applicantInfo.props.previousAddress.zipCode
            }
            isDisabled
          />
          <br />
          <TextField
            label={
              coApplicant
                ? 'How long did the co-applicant live at this address, in months?'
                : 'How long did you live at this address, in months?'
            }
            type="number"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantPreviousAddress.monthsLivedHere
                : applicantInfo.props.previousAddress.monthsLivedHere
            }
            isDisabled
          />
          <br />
          <RadioGroupField
            name="ownershipStatus"
            label={
              coApplicant
                ? 'Which of these best represents the ownership status of the previous address the co-applicant lived in?'
                : 'Which of these best represents the ownership status of the previous address you lived in?'
            }
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
  coApplicant: PropTypes.bool,
};

export function TypeOfCredit({
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
      typeOfCredit: false,
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
        reviewedSections.typeOfCredit || submitted
      )} Type of Credit`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      <RadioGroupField
        label="Credit type:"
        value={applicantInfo?.props.typeOfCredit.creditType}
        isDisabled
        isReadOnly
      >
        {creditTypes.map((creditType) => (
          <Radio key={creditType} value={creditType}>
            {creditType}
          </Radio>
        ))}
      </RadioGroupField>

      <br />
      {applicantInfo?.props.typeOfCredit.creditType === creditTypes[1] && (
        <>
          <TextField
            label="Total number of borrowers:"
            type="number"
            value={applicantInfo?.props.typeOfCredit.totalNumberOfBorrowers}
            isDisabled
            isReadOnly
          />
          <br />
        </>
      )}
      {applicantInfo?.props.typeOfCredit.creditType === creditTypes[2] && (
        <>
          <TextField
            label="Your initials:"
            value={applicantInfo?.props.typeOfCredit.yourInitials}
            isDisabled
            isReadOnly
          />
          <br />
        </>
      )}
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
    </CustomExpandableCard>
  );
}

TypeOfCredit.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

export function CoApplicant({
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
      coApplicant: false,
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
        reviewedSections.coApplicant || submitted
      )} Co-applicant`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      <RadioGroupField
        label="You have a co-applicant?"
        value={applicantInfo?.props.hasCoApplicant}
        isDisabled
      >
        <Radio value="No">No</Radio>
        <Radio value="Yes">Yes</Radio>
      </RadioGroupField>

      <br />
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
    </CustomExpandableCard>
  );
}

CoApplicant.propTypes = {
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
  typeOfCreditOpen,
  setTypeOfCreditOpen,
  handleTypeOfCreditOnReview,
  coApplicantOpen,
  setCoApplicantOpen,
  handleCoApplicantOnReview,
  coApplicantBasicInfoOpen,
  setCoApplicantBasicInfoOpen,
  handleCoApplicantBasicInformationOnReview,
  coApplicantUnmarriedAddendumOpen,
  setCoApplicantUnmarriedAddendumOpen,
  handleCoApplicantUnmarriedAddendumOnReview,
  coApplicantCurrentAddressOpen,
  setCoApplicantCurrentAddressOpen,
  handleCoApplicantAddressOnReview,
  coApplicantPreviousAddressOpen,
  setCoApplicantPreviousAddressOpen,
  handleCoApplicantPreviousAddressOnReview,
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
              habitat?.props.homeownershipMinCurrentAddressMonths
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
      <TypeOfCredit
        expanded={typeOfCreditOpen}
        onExpandedChange={setTypeOfCreditOpen}
        applicantInfo={applicantInfo}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        onReview={handleTypeOfCreditOnReview}
        submitted={submitted}
      />
      <br />
      <CoApplicant
        expanded={coApplicantOpen}
        onExpandedChange={setCoApplicantOpen}
        applicantInfo={applicantInfo}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        onReview={handleCoApplicantOnReview}
        submitted={submitted}
      />
      <br />
      {applicantInfo?.props?.hasCoApplicant === 'Yes' && (
        <>
          <BasicInformation
            expanded={coApplicantBasicInfoOpen}
            onExpandedChange={setCoApplicantBasicInfoOpen}
            applicantInfo={applicantInfo}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={handleCoApplicantBasicInformationOnReview}
            submitted={submitted}
            coApplicant
          />
          <br />
          {applicantInfo?.props?.coApplicantBasicInfo?.maritalStatus ===
            maritalStatusValues[2] && (
            <>
              <UnmarriedAddendum
                expanded={coApplicantUnmarriedAddendumOpen}
                onExpandedChange={setCoApplicantUnmarriedAddendumOpen}
                applicantInfo={applicantInfo}
                reviewedSections={reviewedSections}
                setReviewedSections={setReviewedSections}
                onReview={handleCoApplicantUnmarriedAddendumOnReview}
                submitted={submitted}
                coApplicant
              />
              <br />
            </>
          )}
          <Address
            expanded={coApplicantCurrentAddressOpen}
            onExpandedChange={setCoApplicantCurrentAddressOpen}
            applicantInfo={applicantInfo}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={handleCoApplicantAddressOnReview}
            submitted={submitted}
            coApplicant
          />
          <br />
          {applicantInfo?.props?.coApplicantCurrentAddress?.monthsLivedHere <
            habitat?.props.homeownershipMinCurrentAddressMonths && (
            <>
              <PrevAddress
                expanded={coApplicantPreviousAddressOpen}
                onExpandedChange={setCoApplicantPreviousAddressOpen}
                applicantInfo={applicantInfo}
                reviewedSections={reviewedSections}
                setReviewedSections={setReviewedSections}
                onReview={handleCoApplicantPreviousAddressOnReview}
                submitted={submitted}
                coApplicant
              />
              <br />
            </>
          )}
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
  typeOfCreditOpen: PropTypes.bool,
  setTypeOfCreditOpen: PropTypes.func,
  handleTypeOfCreditOnReview: PropTypes.func,
  coApplicantOpen: PropTypes.bool,
  setCoApplicantOpen: PropTypes.func,
  handleCoApplicantOnReview: PropTypes.func,
  coApplicantBasicInfoOpen: PropTypes.bool,
  setCoApplicantBasicInfoOpen: PropTypes.func,
  handleCoApplicantBasicInformationOnReview: PropTypes.func,
  coApplicantUnmarriedAddendumOpen: PropTypes.bool,
  setCoApplicantUnmarriedAddendumOpen: PropTypes.func,
  handleCoApplicantUnmarriedAddendumOnReview: PropTypes.func,
  coApplicantCurrentAddressOpen: PropTypes.bool,
  setCoApplicantCurrentAddressOpen: PropTypes.func,
  handleCoApplicantAddressOnReview: PropTypes.func,
  coApplicantPreviousAddressOpen: PropTypes.bool,
  setCoApplicantPreviousAddressOpen: PropTypes.func,
  handleCoApplicantPreviousAddressOnReview: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  submitted: PropTypes.bool,
};

export default ApplicantInfoSection;
