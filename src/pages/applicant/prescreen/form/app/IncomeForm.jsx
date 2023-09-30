import PropTypes from 'prop-types';
import { Flex, Heading, Text, useBreakpointValue } from '@aws-amplify/ui-react';
import { IncomeCreate } from './IncomeCreate';
import { IncomeList } from '../../../../../components/applications/IncomeList/IncomeList';

export function IncomeForm({ application, habitat, incomeRecords, owners }) {
  const sizeRenderer = useBreakpointValue({
    base: true,
    small: true,
    medium: true,
    large: false,
    xl: false,
    xxl: false,
  });

  return (
    <Flex direction="column" width="100%">
      <Heading level="4" textAlign="center">
        Income Information
      </Heading>
      <Text textAlign="center">
        Please list all income records for your coapplicant and yourself.
      </Text>
      <IncomeList
        items={incomeRecords}
        sizeRenderer={sizeRenderer}
        application={application}
      />
      <IncomeCreate
        owners={owners}
        habitat={habitat}
        application={application}
      />
    </Flex>
  );
}

IncomeForm.propTypes = {
  application: PropTypes.object,
  habitat: PropTypes.object,
  incomeRecords: PropTypes.array,
  owners: PropTypes.array,
};
