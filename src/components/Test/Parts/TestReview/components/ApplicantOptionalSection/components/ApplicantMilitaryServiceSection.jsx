import PropTypes from 'prop-types';
import {
  Button,
  Flex,
  Radio,
  RadioGroupField,
  TextField,
} from '@aws-amplify/ui-react';
import { useEffect, useRef } from 'react';
import { getCheckOrExEmoji } from 'utils/misc';
import { Link } from 'react-router-dom';
import CustomExpandableCard from 'components/CustomExpandableCard';

const editRoute = '../applicant-optional';

const ApplicantMilitaryServiceSection = ({
  applicantOptional,
  expanded,
  onExpandedChange,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
}) => {
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
        reviewedSections.applicantMilitaryService || submitted
      )} Applicant military service`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      <RadioGroupField
        label="Did you (or your deceased spouse) serve, or are you currently serving, in the United States Armed Forces?"
        value={
          applicantOptional?.props?.applicantMilitaryService
            ?.serveOrServedInUSAF
        }
        isReadOnly
        isDisabled
      >
        <Radio value="Yes">Yes</Radio>
        <Radio value="No">No</Radio>
      </RadioGroupField>

      <br />
      {applicantOptional?.props?.applicantMilitaryService
        ?.serveOrServedInUSAF === 'Yes' && (
        <>
          <RadioGroupField
            label="Currently serving on active duty?"
            value={
              applicantOptional?.props?.applicantMilitaryService
                ?.currentlyServing || ''
            }
            isReadOnly
            isDisabled
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </RadioGroupField>

          <br />
          {applicantOptional?.props?.applicantMilitaryService
            ?.currentlyServing === 'Yes' && (
            <>
              <TextField
                value={
                  applicantOptional?.props?.applicantMilitaryService
                    ?.projectedExpirationDateOfServiceTour
                }
                isReadOnly
                isDisabled
                type="date"
                label="Projected expiration date of service/tour"
              />
              <br />
            </>
          )}

          <RadioGroupField
            label="Currently retired, discharged, or separted from service?"
            value={
              applicantOptional?.props?.applicantMilitaryService
                ?.currentlyRetiredDischargedOrSeparated || ''
            }
            isReadOnly
            isDisabled
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </RadioGroupField>

          <br />

          <RadioGroupField
            label="Only period of service was a non-activated member of the Reserve of National Guard?"
            value={
              applicantOptional?.props?.applicantMilitaryService
                ?.onlyPeriodWasNonActive || ''
            }
            isReadOnly
            isDisabled
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </RadioGroupField>

          <br />

          <RadioGroupField
            label="Surviving spouse?"
            value={
              applicantOptional?.props?.applicantMilitaryService
                ?.survivingSpouse || ''
            }
            isReadOnly
            isDisabled
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </RadioGroupField>

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
};

ApplicantMilitaryServiceSection.propTypes = {
  applicantOptional: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

export default ApplicantMilitaryServiceSection;
