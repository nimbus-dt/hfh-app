import PropTypes from 'prop-types';
import { Flex, Heading, Text, useBreakpointValue } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import { DebtRecord } from '../../../../../models';
import { DebtCreate } from './DebtCreate';
import { DebtList } from '../../../../../components/applications/DebtList/DebtList';

/**
 * DebtForm displays details about debt. It is used to create and edit a Habitat - specific debt
 */
export function DebtForm({ applicationID, debtRecords, owners }) {
  const sizeRenderer = useBreakpointValue({
    base: true,
    small: true,
    medium: true,
    large: false,
    xl: false,
    xxl: false,
  });

  const handleCreate = async (e) => {
    e.preventDefault();

    const formFields = e.target.elements;
    const monthlyRecurrence = Number(
      Number(formFields.monthlyRecurrence.value).toFixed(2)
    );
    const typeOfDebt = formFields.typeOfDebt.value;
    const estimatedAmount = Number(
      Number(formFields.estimatedAmount.value).toFixed(2)
    );
    const ownerID = formFields.owner.value;

    await DataStore.save(
      new DebtRecord({
        ownerID,
        monthlyRecurrence, // Update the variable name here
        typeOfDebt,
        estimatedAmount,
        applicationID,
      })
    );

    e.target.reset();
  };

  return (
    <Flex direction="column" width="100%">
      <Heading level="4" textAlign="center">
        Debt Information
      </Heading>
      <Text textAlign="center">
        Please list all debt records for your coapplicant and yourself.
      </Text>
      <DebtList items={debtRecords} sizeRenderer={sizeRenderer} />
      <DebtCreate handleCreate={handleCreate} owners={owners} />
    </Flex>
  );
}

DebtForm.propTypes = {
  applicationID: PropTypes.string,
  debtRecords: PropTypes.array,
  owners: PropTypes.array,
};
