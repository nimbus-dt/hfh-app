import {
  RadioGroupField,
  TextField,
  Radio,
  Button,
  Flex,
  SelectField,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getCheckOrExEmoji } from 'utils/misc';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { RELATIONSHIP_OPTIONS } from 'utils/constants';
import LoadingData from '../../LoadingData';
import { maritalStatusValues } from '../../../../applicant-info/HomeownershipApplicantInfoPage.schema';

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
  coApplicantMember,
}) {
  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      ...(coApplicant ? { coApplicantBasicInfo: false } : { basicInfo: false }),
    }));
  }, [coApplicant, setReviewedSections]);

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
        (coApplicant
          ? reviewedSections.coApplicantBasicInfo
          : reviewedSections.basicInfo) || submitted
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
          {coApplicant && (
            <>
              <SelectField
                label="What is the co-applicant's sex?"
                value={coApplicantMember?.props.sex}
                isDisabled
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </SelectField>
              <br />
              <SelectField
                label="What is your relationship with the co-applicant?"
                value={
                  RELATIONSHIP_OPTIONS.includes(
                    coApplicantMember?.props.relationship
                  )
                    ? coApplicantMember?.props.relationship
                    : 'Other'
                }
                isDisabled
              >
                {RELATIONSHIP_OPTIONS.map((relationshipOption) => (
                  <option key={relationshipOption} value={relationshipOption}>
                    {relationshipOption}
                  </option>
                ))}
              </SelectField>
              <br />
              {!RELATIONSHIP_OPTIONS.includes(
                coApplicantMember?.props.relationship
              ) && (
                <TextField
                  label="Please describe this relationship"
                  value={coApplicantMember?.props.relationship}
                  isDisabled
                />
              )}
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
  coApplicantMember: PropTypes.object,
};

export default BasicInformation;
