import {
  RadioGroupField,
  TextField,
  Radio,
  Button,
  Flex,
  SelectField,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getCheckOrExEmoji } from 'utils/misc';
import CustomExpandableCard from 'components/CustomExpandableCard';
import SearchableSelectInput from 'components/SearchableSelectInput';
import LoadingData from '../../LoadingData';
import { ownerShipValues } from '../../../../applicant-info/HomeownershipApplicantInfoPage.schema';
import states from '../../../../../../../assets/jsons/states.json';

const editRoute = '../applicant-info';

function PrevAddress({
  expanded,
  onExpandedChange,
  applicantInfo,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
  coApplicant,
}) {
  const customCardReference = useRef(null);

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      ...(coApplicant
        ? { coApplicantPrevAddress: false }
        : { prevAddress: false }),
    }));
  }, [coApplicant, setReviewedSections]);

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
          ? reviewedSections.coApplicantPrevAddress
          : reviewedSections.prevAddress) || submitted
      )}${coApplicant ? ' Co-applicant' : ''} Previous Address`}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
      ref={customCardReference}
    >
      {applicantInfo === undefined ? (
        <LoadingData />
      ) : (
        <>
          <SelectField
            label="State"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantPreviousAddress.state
                : applicantInfo.props.previousAddress.state
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
                ? applicantInfo.props.coApplicantPreviousAddress.city
                : applicantInfo.props.previousAddress.city,
              label: coApplicant
                ? applicantInfo.props.coApplicantPreviousAddress.city
                : applicantInfo.props.previousAddress.city,
            }}
            isDisabled
          />
          <br />
          <TextField
            label="Street"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantPreviousAddress.street
                : applicantInfo.props.previousAddress.street
            }
            isDisabled
          />
          <br />
          <TextField
            label="Zip code"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantPreviousAddress.zipCode
                : applicantInfo.props.previousAddress.zipCode
            }
            isDisabled
          />
          <br />
          <TextField
            label={
              coApplicant
                ? 'How long did the co-applicant live at this address, in months?'
                : 'How long did you live at this address, in months?'
            }
            type="number"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantPreviousAddress.monthsLivedHere
                : applicantInfo.props.previousAddress.monthsLivedHere
            }
            isDisabled
          />
          <br />
          <RadioGroupField
            name="ownershipStatus"
            label={
              coApplicant
                ? 'Which of these best represents the ownership status of the previous address the co-applicant lived in?'
                : 'Which of these best represents the ownership status of the previous address you lived in?'
            }
            value={
              coApplicant
                ? applicantInfo.props.coApplicantPreviousAddress.ownershipStatus
                : applicantInfo.props.previousAddress.ownershipStatus
            }
            isDisabled
          >
            {ownerShipValues.map((ownerShip) => (
              <Radio key={ownerShip} value={ownerShip}>
                {ownerShip}
              </Radio>
            ))}
          </RadioGroupField>

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
        </>
      )}
    </CustomExpandableCard>
  );
}

PrevAddress.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
  coApplicant: PropTypes.bool,
};

export default PrevAddress;
