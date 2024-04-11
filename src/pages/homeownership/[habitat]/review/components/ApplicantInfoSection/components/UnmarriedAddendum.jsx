import {
  RadioGroupField,
  TextField,
  Radio,
  Button,
  Flex,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getCheckOrExEmoji } from 'utils/misc';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { unmarriedRelationshipTypesValues } from '../../../../applicant-info/HomeownershipApplicantInfoPage.schema';

const editRoute = '../applicant-info';

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
          ? reviewedSections.coApplicantUnmarriedAddendum
          : reviewedSections.unmarriedAddendum) || submitted
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

export default UnmarriedAddendum;
