import {
  Button,
  Flex,
  Radio,
  RadioGroupField,
  TextField,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getCheckOrExEmoji } from 'utils/misc';
import CustomExpandableCard from 'components/CustomExpandableCard';
import LoadingData from '../../LoadingData';

const CurrentEmployment = ({
  employmentInfo,
  expanded,
  onExpandedChange,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
}) => {
  const customCardReference = useRef(null);

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      currentEmployment: false,
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
        reviewedSections.currentEmployment || submitted
      )} Employment Information`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      {employmentInfo ? (
        <>
          <TextField
            label="What is the name of your current employer?"
            value={employmentInfo?.props?.currentEmployment.employerName}
            isDisabled
          />
          <br />
          <TextField
            label="What is the address of your current employer?"
            value={employmentInfo?.props?.currentEmployment.employerAddress}
            isDisabled
          />
          <br />
          <TextField
            label="What was your approximate start date with this employer?"
            value={employmentInfo?.props?.currentEmployment.startDate}
            type="date"
            isDisabled
          />
          <br />
          <TextField
            label="Type of Business?"
            value={employmentInfo?.props?.currentEmployment.businessType}
            isDisabled
          />
          <br />
          <TextField
            label="Business phone?"
            value={employmentInfo?.props?.currentEmployment.businessPhone}
            isDisabled
          />
          <br />

          <RadioGroupField
            name="firstJob"
            label="Is this your first job?"
            value={employmentInfo?.props?.currentEmployment.firstJob}
            isDisabled
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </RadioGroupField>

          <br />
          {!submitted && (
            <Flex width="100%" justifyContent="end">
              <Link to="../employment">
                <Button>Edit</Button>
              </Link>
              <Button onClick={onReview} variation="primary">
                Confirm
              </Button>
            </Flex>
          )}
        </>
      ) : (
        <LoadingData />
      )}
    </CustomExpandableCard>
  );
};

CurrentEmployment.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

export default CurrentEmployment;
