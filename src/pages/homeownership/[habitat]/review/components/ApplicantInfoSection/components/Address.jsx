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

const Address = ({
  expanded,
  onExpandedChange,
  applicantInfo,
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
      ...(coApplicant ? { coApplicantAddress: false } : { address: false }),
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
          ? reviewedSections.coApplicantAddress
          : reviewedSections.address) || submitted
      )}${coApplicant ? ' Co-applicant' : ''} Present Address`}
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
                ? applicantInfo.props.coApplicantCurrentAddress.state
                : applicantInfo.props.currentAddress.state
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
                ? applicantInfo.props.coApplicantCurrentAddress.city
                : applicantInfo.props.currentAddress.city,
              label: coApplicant
                ? applicantInfo.props.coApplicantCurrentAddress.city
                : applicantInfo.props.currentAddress.city,
            }}
            isDisabled
          />
          <br />
          <TextField
            label="Street"
            isDisabled
            value={
              coApplicant
                ? applicantInfo.props.coApplicantCurrentAddress.street
                : applicantInfo.props.currentAddress.street
            }
          />
          <br />
          <TextField
            label="Zip code"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantCurrentAddress.zipCode
                : applicantInfo.props.currentAddress.zipCode
            }
            isDisabled
          />
          <br />
          <TextField
            label={
              coApplicant
                ? 'How long have the co-applicant lived at this address, in months?'
                : 'How long have you lived at this address, in months?'
            }
            type="number"
            value={
              coApplicant
                ? applicantInfo.props.coApplicantCurrentAddress.monthsLivedHere
                : applicantInfo.props.currentAddress.monthsLivedHere
            }
            isDisabled
          />
          <br />

          <RadioGroupField
            label={
              coApplicant
                ? 'Which of these best represents the ownership status of the address the co-applicant currently live in?'
                : 'Which of these best represents the ownership status of the address you currently live in?'
            }
            value={
              coApplicant
                ? applicantInfo.props.coApplicantCurrentAddress.ownershipStatus
                : applicantInfo.props.currentAddress.ownershipStatus
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
};

Address.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
  coApplicant: PropTypes.bool,
};

export default Address;
