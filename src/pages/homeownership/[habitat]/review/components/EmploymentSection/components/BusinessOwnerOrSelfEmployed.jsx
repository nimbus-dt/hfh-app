import { Button, Flex, Radio, RadioGroupField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { getCheckOrExEmoji } from 'utils/misc';
import CurrencyInput from 'components/CurrencyInput';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ownershipShareOptions } from 'pages/homeownership/[habitat]/employment/HomeownershipEmploymentPage.schema';

const BusinessOwnerOrSelfEmployed = ({
  employmentInfo,
  expanded,
  onExpandedChange,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
  coApplicant,
}) => {
  const customCardReference = useRef(null);

  const businessOwnerOrSelfEmployed = coApplicant
    ? employmentInfo?.props?.coApplicantBusinessOwnerOrSelfEmployed
    : employmentInfo?.props?.businessOwnerOrSelfEmployed;

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      ...(coApplicant
        ? { coApplicantBusinessOwnerOrSelfEmployed: false }
        : { businessOwnerOrSelfEmployed: false }),
    }));
  }, [setReviewedSections, coApplicant]);

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
        (coApplicant
          ? reviewedSections.coApplicantBusinessOwnerOrSelfEmployed
          : reviewedSections.businessOwnerOrSelfEmployed) || submitted
      )}${coApplicant ? ' Co-applicant' : ''} Business Owner or Self-Employed`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <RadioGroupField
        label={
          coApplicant
            ? 'Is the co-applicant currently a business owner or are self-employed?'
            : 'Are you currently a business owner or are self-employed?'
        }
        value={
          businessOwnerOrSelfEmployed?.currentlyBusinessOwnerOrSelfEmployed
        }
        isDisabled
      >
        <Radio value="Yes">Yes</Radio>
        <Radio value="No">No</Radio>
      </RadioGroupField>

      <br />
      {businessOwnerOrSelfEmployed?.currentlyBusinessOwnerOrSelfEmployed ===
        'Yes' && (
        <>
          <RadioGroupField
            label={
              coApplicant
                ? "What is the co-applicant's ownership share?"
                : 'What is your ownership share?'
            }
            value={businessOwnerOrSelfEmployed?.ownershipShare}
            isDisabled
          >
            {ownershipShareOptions.map((ownershipOption) => (
              <Radio key={ownershipOption} value={ownershipOption}>
                {ownershipOption}
              </Radio>
            ))}
          </RadioGroupField>
          <br />
          <CurrencyInput
            label="Montly income (or loss)"
            value={businessOwnerOrSelfEmployed?.montlyIncome}
            isDisabled
          />
          <br />
        </>
      )}

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
    </CustomExpandableCard>
  );
};

BusinessOwnerOrSelfEmployed.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
  coApplicant: PropTypes.bool,
};

export default BusinessOwnerOrSelfEmployed;
