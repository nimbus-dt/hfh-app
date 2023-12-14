import PropTypes from 'prop-types';
import { Flex, Heading, Text, useBreakpointValue } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import { HouseholdMember } from 'models';
import { isAdult } from 'utils/dates';
import { HouseholdList } from '../../../../../components/applications/HouseholdList/HouseholdList';
import { HouseholdCreate } from './HouseholdCreate';

export function HouseholdForm({ applicationID, householdMembers }) {
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
      // Access the form fields
      const formFields = e.target.elements;

      // Retrieve the values using the form field names
      const name = formFields.name.value;
      const dob = formFields.dob.value;
      const sex = formFields.sex.value;
      const relationship = formFields.relationship.value;
      const isUnemployed = isAdult(dob)
        ? formFields.isUnemployed.value === 'yes'
        : undefined;

      // Create user
      await DataStore.save(
        new HouseholdMember({
          name,
          dateOfBirth: dob,
          sex,
          relationship,
          isUnemployed,
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

      <HouseholdList
        items={householdMembers}
        sizeRenderer={sizeRenderer}
        isEditable
      />

      <HouseholdCreate handleCreate={handleCreate} />
    </Flex>
  );
}

HouseholdForm.propTypes = {
  applicationID: PropTypes.string,
  householdMembers: PropTypes.array,
};
