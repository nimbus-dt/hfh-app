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
}) => {
  const customCardReference = useRef(null);

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      previousEmployment: false,
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
        reviewedSections.previousEmployment || submitted
      )} Previous Employment Information`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      {employmentInfo ? (
        <>
          <TextField
            label="What is the name of your previous employer?"
            value={employmentInfo?.props?.previousEmployment.employerName}
            isDisabled
          />
          <br />
          <SelectField
            label="State"
            value={employmentInfo?.props?.previousEmployment.employerState}
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
              id: employmentInfo?.props?.previousEmployment.employerCity,
              label: employmentInfo?.props?.previousEmployment.employerCity,
            }}
            isDisabled
          />
          <br />
          <TextField
            label="Street"
            value={employmentInfo?.props?.previousEmployment.employerStreet}
            isDisabled
          />
          <br />
          <TextField
            label="Zip code"
            value={employmentInfo?.props?.previousEmployment.employerZipCode}
            isDisabled
          />
          <br />
          <TextField
            label="What was your approximate start date with this employer?"
            value={employmentInfo?.props?.previousEmployment.startDate}
            type="date"
            isDisabled
          />
          <br />
          <TextField
            label="What was your approximate end date with this employer?"
            value={employmentInfo?.props?.previousEmployment.endDate}
            type="date"
            isDisabled
          />
          <br />
          <TextField
            label="Type of Business?"
            value={employmentInfo?.props?.previousEmployment.businessType}
            isDisabled
          />
          <br />
          <TextField
            label="Business phone?"
            value={employmentInfo?.props?.previousEmployment.businessPhone}
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
};

export default PreviousEmployment;
