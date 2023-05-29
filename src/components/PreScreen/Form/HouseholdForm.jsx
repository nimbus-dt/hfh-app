/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Flex,
  Button,
  TextField,
  SelectField,
  Heading,
  PhoneNumberField,
  Card,
  Collection,
  Divider,
  Image,
  View,
  Text,
  RadioGroupField,
  Radio,
  useBreakpointValue,
  Link,
} from '@aws-amplify/ui-react';
import { DataStore, Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { HouseholdMember, SexTypes, RelationshipTypes } from '../../../models';

export function HouseholdForm({ application }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Access the form fields
    const formFields = e.target.elements;

    // Retrieve the values using the form field names
    const name = formFields.name.value;
    const lastName = formFields.lastName.value;
    const dob = formFields.dob.value;
    const sex = formFields.sex.value;
    const relationship = formFields.relationship.value;
    const isCoapplicant = formFields.isCoapplicant.value;

    // Create user
    await DataStore.save(
      new HouseholdMember({
        name,
        lastName,
        dateOfBirth: dob,
        sex,
        relationship,
        isCoapplicant,
        applicationID: application.id,
      })
    );

    // Reset the form
    e.target.reset();
  };

  const sizeRenderer = useBreakpointValue({
    base: true,
    small: true,
    medium: true,
    large: false,
    xl: false,
    xxl: false,
  });

  const householdCreateForm = (
    <Card variation="elevated">
      <Heading textAlign="center">Household Member Create</Heading>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="30px">
          <TextField name="name" label="Name" isRequired />
          <TextField name="lastName" label="Last Name" isRequired />
          <TextField name="dob" label="Date of Birth" type="date" isRequired />
          <SelectField
            name="sex"
            label="Sex"
            isRequired
            placeholder="Select an option"
          >
            <option value={SexTypes.MALE}>Male</option>
            <option value={SexTypes.FEMALE}>Female</option>
            <option value="other">Other</option>
          </SelectField>
          <SelectField
            name="relationship"
            label="Relationship"
            isRequired
            placeholder="Select an option"
          >
            <option value={RelationshipTypes.SPOUSE}>Spouse</option>
            <option value={RelationshipTypes.SON}>Son</option>
            <option value={RelationshipTypes.DAUGHTER}>Daughter</option>{' '}
            <option value={RelationshipTypes.NEPHEW}>Nephew</option>{' '}
            <option value={RelationshipTypes.NIECE}>Niece</option>{' '}
            <option value={RelationshipTypes.PARENT}>Parent</option>
            <option value={RelationshipTypes.SIBLING}>Sibling</option>
            <option value={RelationshipTypes.OTHER}>Other</option>
          </SelectField>
          <RadioGroupField
            name="isCoapplicant"
            isRequired
            label="Is this person a coapplicant?"
          >
            <Radio value>Yes</Radio>
            <Radio value={false}>No</Radio>
          </RadioGroupField>

          <Button type="submit" variation="primary">
            Submit
          </Button>
        </Flex>
      </form>
    </Card>
  );

  return (
    <Flex direction="column" width="100%">
      <Heading level="4" textAlign="center">
        Household Information
      </Heading>
      <Text textAlign="center">
        Here you will be able to tell us who is part of your household
      </Text>
      <HouseholdMemberCollection sizeRenderer={sizeRenderer} />
      {householdCreateForm}
    </Flex>
  );
}

export function HouseholdMemberDetail({
  name,
  lastName,
  dob,
  sex,
  relationship,
  isCoapplicant,
  sizeRenderer,
}) {
  return (
    <Card variation="elevated" width={sizeRenderer ? '80%' : '300px'}>
      <Flex direction="column" gap="1px">
        <Heading level="4">
          {name} {lastName}
        </Heading>
        <Flex gap="5px">
          <Text fontWeight="bold">Date of birth:</Text>
          <Text>{dob}</Text>
        </Flex>
        <Flex gap="5px">
          <Text fontWeight="bold">Sex:</Text>
          <Text>{sex}</Text>
        </Flex>
        <Flex gap="5px">
          <Text fontWeight="bold">Relationship:</Text>
          <Text>{relationship}</Text>
        </Flex>
        <Flex gap="5px">
          <Text fontWeight="bold">Is CoApplicant:</Text>
          <Text>{String(isCoapplicant)}</Text>
        </Flex>
        <Link>Delete</Link>
      </Flex>
    </Card>
  );
}

export function HouseholdMemberCollection({ sizeRenderer }) {
  const items = [
    {
      name: 'John',
      lastName: 'Doe',
      dateOfBirth: '1980-01-01',
      sex: 'Male',
      relationship: 'Spouse',
      isCoapplicant: false,
    },
    {
      name: 'Jane',
      lastName: 'Doe',
      dateOfBirth: '1982-05-10',
      sex: 'Female',
      relationship: 'Spouse',
      isCoapplicant: false,
    },
    {
      name: 'Alex',
      lastName: 'Smith',
      dateOfBirth: '1995-09-15',
      sex: 'Male',
      relationship: 'Child',
      isCoapplicant: false,
    },
    {
      name: 'Emily',
      lastName: 'Johnson',
      dateOfBirth: '2000-03-20',
      sex: 'Female',
      relationship: 'Child',
      isCoapplicant: false,
    },
    {
      name: 'David',
      lastName: 'Brown',
      dateOfBirth: '1960-11-05',
      sex: 'Male',
      relationship: 'Parent',
      isCoapplicant: false,
    },
    {
      name: 'Laura',
      lastName: 'Miller',
      dateOfBirth: '1958-07-15',
      sex: 'Female',
      relationship: 'Parent',
      isCoapplicant: false,
    },
  ];

  return (
    <Card variation="elevated" width="100%">
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Heading>Household Member List</Heading>
        <Collection
          items={items}
          type={sizeRenderer ? 'list' : 'grid'}
          gap="20px"
          templateColumns="1fr 1fr"
          templateRows="12rem 12rem"
          wrap
          isPaginated
          itemsPerPage={sizeRenderer ? 1 : 4}
          alignItems="center"
        >
          {(item, index) => (
            <HouseholdMemberDetail
              key={index}
              name={item.name}
              lastName={item.lastName}
              dob={item.dateOfBirth}
              sex={item.sex}
              relationship={item.relationship}
              isCoapplicant={String(item.isCoapplicant)}
              sizeRenderer={sizeRenderer}
            />
          )}
        </Collection>
      </Flex>
    </Card>
  );
}
