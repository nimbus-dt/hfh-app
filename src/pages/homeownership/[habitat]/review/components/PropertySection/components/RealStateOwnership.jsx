import { Button, Flex, Radio, RadioGroupField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { getCheckOrExEmoji } from 'utils/misc';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const RealStateOwnership = ({
  property,
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
      ownRealState: false,
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
        reviewedSections.ownRealState || submitted
      )} Real State Ownership`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      <RadioGroupField
        label="Do you own any real state?"
        value={property?.props?.ownRealState}
        disabled
      >
        <Radio value="Yes">Yes</Radio>
        <Radio value="No">No</Radio>
      </RadioGroupField>

      <br />
      {!submitted && (
        <Flex width="100%" justifyContent="end">
          <Link to="../property">
            <Button>Edit</Button>
          </Link>
          <Button onClick={onReview} variation="primary">
            Confirm
          </Button>
        </Flex>
      )}
    </CustomExpandableCard>
  );
};

RealStateOwnership.propTypes = {
  property: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

export default RealStateOwnership;
