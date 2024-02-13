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

const AnyoneElseMilitaryServiceSection = ({
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
        reviewedSections.anyoneElseMilitaryService || submitted
      )} Household member military service`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      <RadioGroupField
        name="serveOrServedInUSAF"
        label="Is anyone else in your household serving, or did they save, in the United States Armed Forces?"
        defaultValue={
          applicantOptional?.props?.anyoneElseMilitaryService
            ?.serveOrServedInUSAF
        }
        isDisabled
      >
        <Radio value="Yes">Yes</Radio>
        <Radio value="No">No</Radio>
      </RadioGroupField>

      <br />
      {applicantOptional?.props?.anyoneElseMilitaryService
        ?.serveOrServedWatch === 'Yes' && (
        <>
          <RadioGroupField
            name="currentlyServing"
            label="Currently serving on active duty?"
            defaultValue={
              applicantOptional?.props?.anyoneElseMilitaryService
                ?.currentlyServing
            }
            isDisabled
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </RadioGroupField>

          <br />
          {applicantOptional?.props?.anyoneElseMilitaryService
            ?.currentlyServingWatch === 'Yes' && (
            <>
              <TextField
                defaultValue={
                  applicantOptional?.props?.anyoneElseMilitaryService
                    .projectedExpirationDateOfServiceTour
                }
                type="date"
                label="Projected expiration date of service/tour"
                isDisabled
              />
              <br />
            </>
          )}
          <RadioGroupField
            name="currentlyRetiredDischargedOrSeparated"
            label="Currently retired, discharged, or separted from service?"
            defaultValue={
              applicantOptional?.props?.anyoneElseMilitaryService
                ?.currentlyRetiredDischargedOrSeparated
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
              applicantOptional?.props?.anyoneElseMilitaryService
                ?.onlyPeriodWasNonActive
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

AnyoneElseMilitaryServiceSection.propTypes = {
  applicantOptional: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

export default AnyoneElseMilitaryServiceSection;
