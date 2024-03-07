import { Button, Flex, SelectField, TextField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getCheckOrExEmoji } from 'utils/misc';
import CustomExpandableCard from 'components/CustomExpandableCard';
import SearchableSelectInput from 'components/SearchableSelectInput';
import LoadingData from '../../LoadingData';
import states from '../../../../../../../assets/jsons/states.json';

const PreviousEmployment = ({
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
        ? { coApplicantPreviousEmployment: false }
        : { previousEmployment: false }),
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
      title={`${getCheckOrExEmoji(
        (coApplicant
          ? reviewedSections.coApplicantPreviousEmployment
          : reviewedSections.previousEmployment) || submitted
      )}${coApplicant ? ' Co-applicant' : ''} Previous Employment Information`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      {employmentInfo ? (
        <>
          <TextField
            label={
              coApplicant
                ? "What is the name of the co-applicant's previous employer?"
                : 'What is the name of your previous employer?'
            }
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantPreviousEmployment
                    .employerName
                : employmentInfo?.props?.previousEmployment.employerName
            }
            isDisabled
          />
          <br />
          <SelectField
            label="State"
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantPreviousEmployment
                    .employerState
                : employmentInfo?.props?.previousEmployment.employerState
            }
            isDisabled
          >
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </SelectField>
          <br />
          <SearchableSelectInput
            label="City"
            selectedOption={{
              id: coApplicant
                ? employmentInfo?.props?.coApplicantPreviousEmployment
                    .employerCity
                : employmentInfo?.props?.previousEmployment.employerCity,
              label: coApplicant
                ? employmentInfo?.props?.coApplicantPreviousEmployment
                    .employerCity
                : employmentInfo?.props?.previousEmployment.employerCity,
            }}
            isDisabled
          />
          <br />
          <TextField
            label="Street"
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantPreviousEmployment
                    .employerStreet
                : employmentInfo?.props?.previousEmployment.employerStreet
            }
            isDisabled
          />
          <br />
          <TextField
            label="Zip code"
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantPreviousEmployment
                    .employerZipCode
                : employmentInfo?.props?.previousEmployment.employerZipCode
            }
            isDisabled
          />
          <br />
          <TextField
            label={
              coApplicant
                ? "What was the co-applicant's approximate start date with this employer?"
                : 'What was your approximate start date with this employer?'
            }
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantPreviousEmployment.startDate
                : employmentInfo?.props?.previousEmployment.startDate
            }
            type="date"
            isDisabled
          />
          <br />
          <TextField
            label={
              coApplicant
                ? "What was the co-applicant's approximate end date with this employer?"
                : 'What was your approximate end date with this employer?'
            }
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantPreviousEmployment.endDate
                : employmentInfo?.props?.previousEmployment.endDate
            }
            type="date"
            isDisabled
          />
          <br />
          <TextField
            label="Type of Business?"
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantPreviousEmployment
                    .businessType
                : employmentInfo?.props?.previousEmployment.businessType
            }
            isDisabled
          />
          <br />
          <TextField
            label="Business phone?"
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantPreviousEmployment
                    .businessPhone
                : employmentInfo?.props?.previousEmployment.businessPhone
            }
            isDisabled
          />
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

PreviousEmployment.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
  coApplicant: PropTypes.bool,
};

export default PreviousEmployment;
