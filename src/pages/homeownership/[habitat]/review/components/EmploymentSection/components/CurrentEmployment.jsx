import {
  Button,
  Flex,
  Radio,
  RadioGroupField,
  SelectField,
  TextField,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getCheckOrExEmoji } from 'utils/misc';
import CustomExpandableCard from 'components/CustomExpandableCard';
import SearchableSelectInput from 'components/SearchableSelectInput';
import LoadingData from '../../LoadingData';
import states from '../../../../../../../assets/jsons/states.json';

const CurrentEmployment = ({
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
        ? { coApplicantCurrentEmployment: false }
        : { currentEmployment: false }),
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
          ? reviewedSections.coApplicantCurrentEmployment
          : reviewedSections.currentEmployment) || submitted
      )}${coApplicant ? ' Co-applicant' : ''} Employment Information`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      {employmentInfo ? (
        <>
          <TextField
            label={
              coApplicant
                ? "What is the name of the co-applicant's current employer?"
                : 'What is the name of your current employer?'
            }
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantCurrentEmployment
                    .employerName
                : employmentInfo?.props?.currentEmployment.employerName
            }
            isDisabled
          />
          <br />

          <SelectField
            label="State"
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantCurrentEmployment
                    .employerState
                : employmentInfo?.props?.currentEmployment.employerState
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
                ? employmentInfo?.props?.coApplicantCurrentEmployment
                    .employerCity
                : employmentInfo?.props?.currentEmployment.employerCity,
              label: coApplicant
                ? employmentInfo?.props?.coApplicantCurrentEmployment
                    .employerCity
                : employmentInfo?.props?.currentEmployment.employerCity,
            }}
            isDisabled
          />
          <br />
          <TextField
            label="Street"
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantCurrentEmployment
                    .employerStreet
                : employmentInfo?.props?.currentEmployment.employerStreet
            }
            isDisabled
          />
          <br />
          <TextField
            label="Zip code"
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantCurrentEmployment
                    .employerZipCode
                : employmentInfo?.props?.currentEmployment.employerZipCode
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
            value={employmentInfo?.props?.currentEmployment?.startDate}
            type="date"
            isDisabled
          />
          <br />
          <TextField
            label="Type of Business?"
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantCurrentEmployment
                    .businessType
                : employmentInfo?.props?.currentEmployment.businessType
            }
            isDisabled
          />
          <br />
          <TextField
            label="Business phone?"
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantCurrentEmployment
                    .businessPhone
                : employmentInfo?.props?.currentEmployment.businessPhone
            }
            isDisabled
          />
          <br />

          <RadioGroupField
            label={
              coApplicant
                ? "Is this the co-applicant's first job?"
                : 'Is this your first job?'
            }
            value={
              coApplicant
                ? employmentInfo?.props?.coApplicantCurrentEmployment.firstJob
                : employmentInfo?.props?.currentEmployment.firstJob
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

CurrentEmployment.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
  coApplicant: PropTypes.bool,
};

export default CurrentEmployment;
