/* eslint-disable react/prop-types */
import { Flex, Heading, Text, useBreakpointValue } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { HouseholdMember } from '../../../../models';
import { HouseholdList } from './HouseholdList';
import { HouseholdCreate } from './HouseholdCreate';

export function HouseholdForm({ application, habitat }) {
  const [households, setHouseholds] = useState();
  const [coapplicants, setCoapplicants] = useState(0);
  const [enableCoapplicants, setEnableCoapplicants] = useState(true);

  const sizeRenderer = useBreakpointValue({
    base: true,
    small: true,
    medium: true,
    large: false,
    xl: false,
    xxl: false,
  });

  const countCoapplicants = (household) =>
    household.filter((member) => member.isCoapplicant).length;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCreate = async (e) => {
    e.preventDefault();

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
        applicationID: application?.id,
      })
    );

    // Reset the form
    e.target.reset();
  };

  useEffect(() => {
    const fetchHouseholdMembers = async () => {
      try {
        const householdMemberObjects = await DataStore.query(
          HouseholdMember,
          (c) => c.applicationID.eq(application.id)
        );
        setHouseholds(householdMemberObjects);
        setCoapplicants(countCoapplicants(householdMemberObjects));

        if (coapplicants === habitat?.props?.data?.maxCoapplicants) {
          setEnableCoapplicants(false);
        }
      } catch (error) {
        console.log('Error retrieving HouseholdMembers', error);
      }
    };

    fetchHouseholdMembers();
  }, [
    handleCreate,
    application.id,
    coapplicants,
    habitat?.props?.data?.maxCoapplicants,
  ]);

  const items = households;

  return (
    <Flex direction="column" width="100%">
      <Heading level="4" textAlign="center">
        Household Information
      </Heading>
      <Text textAlign="center">
        Here you will be able to tell us who is part of your household
      </Text>
      <HouseholdList items={items} sizeRenderer={sizeRenderer} />
      <HouseholdCreate
        handleCreate={handleCreate}
        enableCoapplicants={enableCoapplicants}
      />
    </Flex>
  );
}
