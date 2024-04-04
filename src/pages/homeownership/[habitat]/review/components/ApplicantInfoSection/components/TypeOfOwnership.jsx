import { RadioGroupField, Radio, Button, Flex } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { getCheckOrExEmoji } from 'utils/misc';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ownershipTypes } from '../../../../applicant-info/HomeownershipApplicantInfoPage.schema';

const editRoute = '../applicant-info';

export default function TypeOfOwnership({
  expanded,
  onExpandedChange,
  applicantInfo,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
}) {
  const customCardReference = useRef(null);

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      typeOfOwnership: false,
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
        reviewedSections.typeOfOwnership || submitted
      )} Type of Ownership`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <RadioGroupField
        name="ownershipType"
        label="Please select the type of ownership you are applying for."
        value={applicantInfo?.props.typeOfOwnership?.ownershipType}
        isDisabled
        isReadOnly
      >
        {ownershipTypes.map((ownershipType) => (
          <Radio key={ownershipType} value={ownershipType}>
            {ownershipType}
          </Radio>
        ))}
      </RadioGroupField>
      <br />
      {!submitted && (
        <Flex width="100%" justifyContent="end">
          <Link to={editRoute}>
            <Button>Edit</Button>
          </Link>
          <Button onClick={onReview} variation="primary">
            Confirm
          </Button>
        </Flex>
      )}
    </CustomExpandableCard>
  );
}

TypeOfOwnership.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};
