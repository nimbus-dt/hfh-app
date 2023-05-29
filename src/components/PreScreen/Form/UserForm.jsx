/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Flex,
  Button,
  TextField,
  SelectField,
  Heading,
  Card,
  PhoneNumberField,
} from '@aws-amplify/ui-react';
import { DataStore, Auth } from 'aws-amplify';
import { SexTypes, UserProps } from '../../../models';

export function UserForm() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [sex, setSex] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [userDataBool, setUserDataBool] = useState(false);
  const [userID, setUserID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const userData = {
      ownerID: userID,
      firstName: form.elements.name.value,
      lastName: form.elements.lastName.value,
      dob: form.elements.dob.value,
      sex: form.elements.sex.value,
      phone: form.elements.phone.value,
      props: null,
    };

    await DataStore.save(new UserProps(userData));
    setUserDataBool(true);
  };

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });
        setUserID(currentUser.username);

        const userDataObject = await DataStore.query(UserProps, (u) =>
          u.ownerID.eq(currentUser.username)
        );

        if (userDataObject.length > 0) {
          setUserDataBool(true);
        }
      } catch (error) {
        console.log('Error fetching UserData:', error);
      }
    };

    checkUserData();
  }, []);

  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    const formattedNumber = inputValue
      .substring(0, 10)
      .replace(/^(\d{3})/, '$1-') // Add dash after the first 3 digits
      .replace(/^(\d{3})-(\d{3})/, '$1-$2-'); // Add dash after the next 3 digits
    setPhoneNumber(formattedNumber);
  };

  const message = (
    <Heading level="5" textAlign="center">
      You have an existing user information record
    </Heading>
  );

  const userForm = (
    <Flex width="100%" justifyContent="center">
      <Card width="100%" variation="elevated">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="30px">
            <TextField name="name" label="What is your name?" isRequired />
            <TextField
              name="lastName"
              label="What is your last name?"
              isRequired
            />
            <TextField
              name="dob"
              label="What is your date of birth?"
              type="date"
              isRequired
            />
            <SelectField
              name="sex"
              label="What is your sex?"
              isRequired
              placeholder="Select an option"
            >
              <option value={SexTypes.MALE}>Male</option>
              <option value={SexTypes.FEMALE}>Female</option>
              <option value="other">Other</option>
            </SelectField>
            <PhoneNumberField
              name="phone"
              defaultDialCode="+1"
              label="What is your phone number?"
              placeholder="234-567-8910"
              isRequired
              type="tel"
            />
            <TextField
              name="address"
              label="What is your home address?"
              isRequired
            />
            <TextField
              name="zip"
              label="What is your zip code?"
              type="number"
              isRequired
            />
            <Button type="submit" variation="primary">
              Submit
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  );

  return (
    <Flex direction="column" width="100%">
      <Heading level="4" textAlign="center">
        User Information
      </Heading>
      {userDataBool ? message : userForm}
    </Flex>
  );
}
