import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import { Button, Flex, Radio, RadioGroupField } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import LoadingData from '../../LoadingData';

const Unemployment = ({ employmentInfo, expanded, onExpandedChange }) => (
  <CustomExpandableCard
    title="Unemployment"
    expanded={expanded}
    onExpandedChange={onExpandedChange}
  >
    {employmentInfo ? (
      <>
        <RadioGroupField
          label="Are you currently unemployed?"
          value={employmentInfo?.props?.currentlyUnemployed}
          isDisabled
        >
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </RadioGroupField>

        <br />
        <Flex width="100%" justifyContent="end">
          <Button variation="primary">Edit</Button>
        </Flex>
      </>
    ) : (
      <LoadingData />
    )}
  </CustomExpandableCard>
);

Unemployment.propTypes = {
  employmentInfo: PropTypes.object,
  expanded: PropTypes.bool,
  onExpandedChange: PropTypes.func,
};

export default Unemployment;
