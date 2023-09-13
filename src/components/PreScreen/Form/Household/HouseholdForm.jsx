import PropTypes from 'prop-types';
import { Flex, Heading, Text, useBreakpointValue } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import { useState } from 'react';
import { HouseholdMember } from '../../../../models';
import { HouseholdList } from './HouseholdList';
import { HouseholdCreate } from './HouseholdCreate';

const countCoapplicants = (householdMembers) =>
  householdMembers.filter((member) => member.isCoapplicant).length;

export function HouseholdForm({
  applicationID,
  householdMembers,
  habitatMaxCoapplicants,
}) {
  const [coapplicants] = useState(() => countCoapplicants(householdMembers));
  const [enableCoapplicants] = useState(
    () => coapplicants !== habitatMaxCoapplicants
  );

  const sizeRenderer = useBreakpointValue({
    base: true,
    small: true,
    medium: true,
    large: false,
    xl: false,
    xxl: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      // Access the form fields
      const formFields = e.target.elements;

      // Retrieve the values using the form field names
      const name = formFields.name.value;
      const dob = formFields.dob.value;
      const sex = formFields.sex.value;
      const relationship = formFields.relationship.value;
      const isCoapplicant = Boolean(formFields.isCoapplicant.value);

      // Create user
      await DataStore.save(
        new HouseholdMember({
          name,
          dateOfBirth: dob,
          sex,
          relationship,
          isCoapplicant,
          applicationID,
        })
      );

      // Reset the form
      e.target.reset();
    } catch (error) {
      console.log('Error storing household member information', error);
    }
  };

  return (
    <Flex direction="column" width="100%">
      <Heading level="4" textAlign="center">
        Household Information
      </Heading>

      <Text textAlign="center">
        Please input all members of your current household except yourself.
      </Text>

      <HouseholdList items={householdMembers} sizeRenderer={sizeRenderer} />

      <HouseholdCreate
        handleCreate={handleCreate}
        enableCoapplicants={enableCoapplicants}
      />
    </Flex>
  );
}

HouseholdForm.propTypes = {
  applicationID: PropTypes.string,
  householdMembers: PropTypes.array,
  habitatMaxCoapplicants: PropTypes.number,
};
