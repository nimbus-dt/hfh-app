import {
  RadioGroupField,
  TextField,
  Radio,
  Button,
  Flex,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getCheckOrExEmoji } from 'utils/misc';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { creditTypes } from '../../../../applicant-info/HomeownershipApplicantInfoPage.schema';

const editRoute = '../applicant-info';

function TypeOfCredit({
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
      typeOfCredit: false,
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
        reviewedSections.typeOfCredit || submitted
      )} Type of Credit`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      <RadioGroupField
        label="Please select the type of credit you are applying for."
        value={applicantInfo?.props.typeOfCredit?.creditType}
        isDisabled
        isReadOnly
      >
        {creditTypes.map((creditType) => (
          <Radio key={creditType} value={creditType}>
            {creditType}
          </Radio>
        ))}
      </RadioGroupField>

      <br />
      {applicantInfo?.props.typeOfCredit?.creditType === creditTypes[1] && (
        <>
          <TextField
            label="Total number of borrowers:"
            type="number"
            value={applicantInfo?.props.typeOfCredit.totalNumberOfBorrowers}
            isDisabled
            isReadOnly
          />
          <br />
        </>
      )}
      {applicantInfo?.props.typeOfCredit?.creditType === creditTypes[2] && (
        <>
          <TextField
            label="Your initials:"
            value={applicantInfo?.props.typeOfCredit.yourInitials}
            isDisabled
            isReadOnly
          />
          <br />
        </>
      )}
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

TypeOfCredit.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

export default TypeOfCredit;
