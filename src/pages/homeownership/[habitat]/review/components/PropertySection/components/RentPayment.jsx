import { Button, Flex } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { getCheckOrExEmoji } from 'utils/misc';
import CurrencyInput from 'components/CurrencyInput';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const RentPayment = ({
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
      rentPayment: false,
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
      ref={customCardReference}
      title={`${getCheckOrExEmoji(
        reviewedSections.rentPayment || submitted
      )} Rent Payment`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <CurrencyInput
        label="What is your montly rent payment?"
        value={property?.props?.rentPayment?.montlyRent}
        isDisabled
      />
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

RentPayment.propTypes = {
  property: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

export default RentPayment;
