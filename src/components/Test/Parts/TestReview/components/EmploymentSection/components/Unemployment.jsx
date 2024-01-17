import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import { Button, Flex, Radio, RadioGroupField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { getCheckOrExEmoji } from 'utils/misc';
import { Link } from 'react-router-dom';
import LoadingData from '../../LoadingData';

const Unemployment = ({
  employmentInfo,
  expanded,
  onExpandedChange,
  reviewedSections,
  setReviewedSections,
  onReview,
}) => {
  const customCardReference = useRef(null);

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      unemployment: false,
    }));
  }, [setReviewedSections]);

  useEffect(() => {
    if (expanded) {
      customCardReference.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [expanded]);

  return (
    <CustomExpandableCard
      title={`${getCheckOrExEmoji(reviewedSections.unemployment)} Unemployment`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      {employmentInfo ? (
        <>
          <RadioGroupField
            label="Are you currently unemployed?"
            value={employmentInfo?.props?.currentlyUnemployed}
            isDisabled
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </RadioGroupField>

          <br />
          <Flex width="100%" justifyContent="end">
            <Link to="../employment">
              <Button>Edit</Button>
            </Link>
            <Button onClick={onReview} variation="primary">
              Confirm
            </Button>
          </Flex>
        </>
      ) : (
        <LoadingData />
      )}
    </CustomExpandableCard>
  );
};

Unemployment.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
};

export default Unemployment;
