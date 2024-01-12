import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import {
  Button,
  Flex,
  Radio,
  RadioGroupField,
  TextField,
} from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingData from '../../LoadingData';

const CurrentEmployment = ({ employmentInfo, expanded, onExpandedChange }) => (
  <CustomExpandableCard
    title="Employment Information"
    expanded={expanded}
    onExpandedChange={onExpandedChange}
  >
    {employmentInfo ? (
      <>
        <TextField
          label="What is the name of your current employer?"
          value={employmentInfo?.props?.currentEmployment.employerName}
          isDisabled
        />
        <br />
        <TextField
          label="What is the address of your current employer?"
          value={employmentInfo?.props?.currentEmployment.employerAddress}
          isDisabled
        />
        <br />
        <TextField
          label="What was your approximate start date with this employer?"
          value={employmentInfo?.props?.currentEmployment.startDate}
          type="date"
          isDisabled
        />
        <br />
        <TextField
          label="Type of Business?"
          value={employmentInfo?.props?.currentEmployment.businessType}
          isDisabled
        />
        <br />
        <TextField
          label="Business phone?"
          value={employmentInfo?.props?.currentEmployment.businessPhone}
          isDisabled
        />
        <br />

        <RadioGroupField
          name="firstJob"
          label="Is this your first job?"
          value={employmentInfo?.props?.currentEmployment.firstJob}
          isDisabled
        >
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </RadioGroupField>

        <br />
        <Flex width="100%" justifyContent="end">
          <Link to="../employment">
            <Button variation="primary">Edit</Button>
          </Link>
        </Flex>
      </>
    ) : (
      <LoadingData />
    )}
  </CustomExpandableCard>
);

CurrentEmployment.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
};

export default CurrentEmployment;
