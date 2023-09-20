import PropTypes from 'prop-types';
import { Flex, Heading, Text, useBreakpointValue } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import { SavingRecord } from '../../../../models';
import { SavingsCreate } from './SavingsCreate';
import { SavingsList } from './SavingsList';

export function SavingsForm({ applicationID, savingRecords, owners }) {
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

    try {
      const formFields = e.target.elements;
      const institution = formFields.institution.value;
      const estimatedAmount = Number(
        Number(formFields.estimatedAmount.value).toFixed(2)
      );
      const ownerID = formFields.owner.value;

      await DataStore.save(
        new SavingRecord({
          ownerID,
          institution,
          estimatedAmount,
          applicationID,
        })
      );

      e.target.reset();
    } catch (error) {
      console.log('Error storing saving record', error);
    }
  };

  return (
    <Flex direction="column" width="100%">
      <Heading level="4" textAlign="center">
        Savings Information
      </Heading>
      <Text textAlign="center">
        Please list all saving records for your coapplicant and yourself.
      </Text>
      <SavingsList items={savingRecords} sizeRenderer={sizeRenderer} />
      <SavingsCreate handleCreate={handleCreate} owners={owners} />
    </Flex>
  );
}

SavingsForm.propTypes = {
  applicationID: PropTypes.string,
  savingRecords: PropTypes.array,
  owners: PropTypes.array,
};
