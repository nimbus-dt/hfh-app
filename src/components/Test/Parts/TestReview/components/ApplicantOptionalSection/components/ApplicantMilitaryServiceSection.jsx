import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
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
        name="serveOrServedInUSAF"
        label="Did you (or your deceased spouse) serve, or are you currently serving, in the United States Armed Forces?"
        defaultValue={
          applicantOptional?.props?.applicantMilitaryService
            ?.serveOrServedInUSAF || ''
        }
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
            name="currentlyServing"
            label="Currently serving on active duty?"
            defaultValue={
              applicantOptional?.props?.applicantMilitaryService
                ?.currentlyServing || ''
            }
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
                defaultValue={
                  applicantOptional?.props?.applicantMilitaryService
                    ?.projectedExpirationDateOfServiceTour || ''
                }
                type="date"
                label="Projected expiration date of service/tour"
              />
              <br />
            </>
          )}

          <RadioGroupField
            name="currentlyRetiredDischargedOrSeparated"
            label="Currently retired, discharged, or separted from service?"
            defaultValue={
              applicantOptional?.props?.applicantMilitaryService
                ?.currentlyRetiredDischargedOrSeparated || ''
            }
            isDisabled
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </RadioGroupField>

          <br />

          <RadioGroupField
            name="onlyPeriodWasNonActive"
            label="Only period of service was a non-activated member of the Reserve of National Guard?"
            defaultValue={
              applicantOptional?.props?.applicantMilitaryService
                ?.onlyPeriodWasNonActive || ''
            }
            isDisabled
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </RadioGroupField>

          <br />

          <RadioGroupField
            name="survivingSpouse"
            label="Surviving spouse?"
            defaultValue={
              applicantOptional?.props?.applicantMilitaryService
                ?.survivingSpouse || ''
            }
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
