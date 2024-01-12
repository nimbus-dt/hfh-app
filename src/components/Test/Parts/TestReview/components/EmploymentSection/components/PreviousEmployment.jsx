import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import { Button, Flex, TextField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingData from '../../LoadingData';

const PreviousEmployment = ({ employmentInfo, expanded, onExpandedChange }) => (
  <CustomExpandableCard
    title="Previous Employment Information"
    expanded={expanded}
    onExpandedChange={onExpandedChange}
  >
    {employmentInfo ? (
      <>
        <TextField
          label="What is the name of your previous employer?"
          value={employmentInfo?.props?.previousEmployment.employerName}
          isDisabled
        />
        <br />
        <TextField
          label="What is the address of your previous employer?"
          value={employmentInfo?.props?.previousEmployment.employerAddress}
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

PreviousEmployment.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
};

export default PreviousEmployment;
