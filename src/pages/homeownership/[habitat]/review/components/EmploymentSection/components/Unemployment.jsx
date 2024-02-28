import { Button, Flex, Radio, RadioGroupField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { getCheckOrExEmoji } from 'utils/misc';
import { Link } from 'react-router-dom';
import CustomExpandableCard from 'components/CustomExpandableCard';
import LoadingData from '../../LoadingData';

const Unemployment = ({
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

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      ...(coApplicant
        ? { coApplicantUnemployment: false }
        : { unemployment: false }),
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
        getCheckOrExEmoji(
          coApplicant
            ? reviewedSections.coApplicantUnemployment
            : reviewedSections.unemployment
        ) || submitted
      )}${coApplicant ? ' Co-applicant' : ''} Unemployment`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      {employmentInfo ? (
        <>
          <RadioGroupField
            label={
              coApplicant
                ? 'Is the co-applicant currently unemployed?'
                : 'Are you currently unemployed?'
            }
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantCurrentlyUnemployed
                : employmentInfo?.props?.currentlyUnemployed
            }
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

Unemployment.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
  coApplicant: PropTypes.bool,
};

export default Unemployment;
