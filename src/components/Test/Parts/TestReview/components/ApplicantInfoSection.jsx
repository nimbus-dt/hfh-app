import {
  RadioGroupField,
  TextField,
  Radio,
  Button,
  Flex,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ApplicantInfo } from 'models';
import { DataStore } from 'aws-amplify';
import { CustomExpandableCard } from '../../../Reusable/CustomExpandableCard';
import {
  maritalStatusValues,
  ownerShipValues,
} from '../../TestApplicantInfo/aplicantInfo.schema';
import LoadingData from './LoadingData';

const editRoute = '../applicant-info';

function BasicInformation({ applicantInfo, expanded, onExpandedChange }) {
  return (
    <CustomExpandableCard
      title="Basic Information"
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      {applicantInfo === undefined ? (
        <LoadingData />
      ) : (
        <>
          <TextField
            label="What is your full name?"
            value={applicantInfo.props.basicInfo.fullName}
            isDisabled
          />
          <br />
          <TextField
            label="If you have an alternative or a former name, please write it here."
            value={applicantInfo.props.basicInfo.altOrFormerName}
            isDisabled
          />
          <br />
          <TextField
            label="What is your social security number?"
            value={applicantInfo.props.basicInfo.socialSecurityNumber}
            isDisabled
          />
          <br />
          <TextField
            label="What is your home phone?"
            value={applicantInfo.props.basicInfo.homePhone}
            isDisabled
          />
          <br />
          <TextField
            label="What is your cell phone?"
            value={applicantInfo.props.basicInfo.cellPhone}
            isDisabled
          />
          <br />
          <TextField
            label="What is your work phone?"
            value={applicantInfo.props.basicInfo.workPhone}
            isDisabled
          />
          <br />
          <TextField
            label="What is your age?"
            type="number"
            value={applicantInfo.props.basicInfo.age}
            isDisabled
          />
          <br />
          <TextField
            label="What is your date of birth?"
            type="date"
            value={applicantInfo.props.basicInfo.birthDate}
            isDisabled
          />
          <br />

          <RadioGroupField
            label="Which of these best represents your current marital status?"
            value={applicantInfo.props.basicInfo.maritalStatus}
            isDisabled
          >
            {maritalStatusValues.map((maritalStatus) => (
              <Radio key={maritalStatus} value={maritalStatus}>
                {maritalStatus}
              </Radio>
            ))}
          </RadioGroupField>
          <br />
          <Flex width="100%" justifyContent="end">
            <Link to={editRoute}>
              <Button variation="primary">Edit</Button>
            </Link>
          </Flex>
        </>
      )}
    </CustomExpandableCard>
  );
}

BasicInformation.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
};

function Address({ expanded, onExpandedChange, applicantInfo }) {
  return (
    <CustomExpandableCard
      title="Present Address"
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      {applicantInfo === undefined ? (
        <LoadingData />
      ) : (
        <>
          <TextField
            label="What is your present address?"
            value={applicantInfo.props.currentAddress.address}
            isDisabled
          />
          <br />
          <TextField
            label="How long have you lived at this address, in months?"
            type="number"
            value={applicantInfo.props.currentAddress.monthsLivedHere}
            isDisabled
          />
          <br />

          <RadioGroupField
            label="Which of these best represents the ownership status of the address you currently live in?"
            value={applicantInfo.props.currentAddress.ownershipStatus}
            isDisabled
          >
            {ownerShipValues.map((ownerShip) => (
              <Radio key={ownerShip} value={ownerShip}>
                {ownerShip}
              </Radio>
            ))}
          </RadioGroupField>
          <Flex width="100%" justifyContent="end">
            <Link to={editRoute}>
              <Button variation="primary">Edit</Button>
            </Link>
          </Flex>
        </>
      )}
    </CustomExpandableCard>
  );
}

Address.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
};

function PrevAddress({ expanded, onExpandedChange, applicantInfo }) {
  return (
    <CustomExpandableCard
      title="Previous Address"
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      {applicantInfo === undefined ? (
        <LoadingData />
      ) : (
        <>
          <TextField
            label="What is your previous address?"
            value={applicantInfo.props.previousAddress.address}
            isDisabled
          />
          <br />
          <TextField
            label="How long did you live at this address, in months?"
            type="number"
            value={applicantInfo.props.previousAddress.monthsLivedHere}
            isDisabled
          />
          <br />
          <RadioGroupField
            name="ownershipStatus"
            label="Which of these best represents the ownership status of the previous address you lived in?"
            value={applicantInfo.props.previousAddress.ownershipStatus}
            isDisabled
          >
            {ownerShipValues.map((ownerShip) => (
              <Radio key={ownerShip} value={ownerShip}>
                {ownerShip}
              </Radio>
            ))}
          </RadioGroupField>

          <Flex width="100%" justifyContent="end">
            <Link to={editRoute}>
              <Button variation="primary">Edit</Button>
            </Link>
          </Flex>
        </>
      )}
    </CustomExpandableCard>
  );
}

PrevAddress.propTypes = {
  applicantInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
};

const ApplicantInfoSection = () => {
  const { application } = useOutletContext();

  const [applicantInfo, setApplicantInfo] = useState();

  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const [currentAddressOpen, setCurrentAddressOpen] = useState(false);
  const [previousAddressOpen, setPreviousAddressOpen] = useState(false);

  useEffect(() => {
    const getApplicationInfo = async (applicationID) => {
      try {
        const existingApplicantInfo = await DataStore.query(
          ApplicantInfo,
          (c) => c.ownerID.eq(applicationID)
        );
        setApplicantInfo(existingApplicantInfo[0]);
      } catch (error) {
        console.log('Error fetching the applicant info data.');
      }
    };
    if (application) {
      getApplicationInfo(application.id);
    }
  }, [application]);

  return (
    <>
      <BasicInformation
        expanded={basicInfoOpen}
        onExpandedChange={setBasicInfoOpen}
        applicantInfo={applicantInfo}
      />
      <br />
      <Address
        expanded={currentAddressOpen}
        onExpandedChange={setCurrentAddressOpen}
        applicantInfo={applicantInfo}
      />
      <br />
      {applicantInfo?.props?.previousAddress && (
        <>
          <PrevAddress
            expanded={previousAddressOpen}
            onExpandedChange={setPreviousAddressOpen}
            applicantInfo={applicantInfo}
          />
          <br />
        </>
      )}
    </>
  );
};

export default ApplicantInfoSection;
