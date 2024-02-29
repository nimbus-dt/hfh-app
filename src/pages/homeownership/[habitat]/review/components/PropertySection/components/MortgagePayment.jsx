import { Button, Flex } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { getCheckOrExEmoji } from 'utils/misc';
import CurrencyInput from 'components/CurrencyInput';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const MortgagePayment = ({
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
      mortgagePayment: false,
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
        reviewedSections.mortgagePayment || submitted
      )} Mortgage Payment`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      <CurrencyInput
        label="What is your montly mortgage payment (including taxes, insurance, etc.)?"
        value={property?.props?.mortgagePayment?.montlyMortgage}
        isDisabled
      />
      <br />
      <CurrencyInput
        label="Unpaid balance"
        value={property?.props?.mortgagePayment?.unpaidBalance}
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

MortgagePayment.propTypes = {
  property: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

export default MortgagePayment;
