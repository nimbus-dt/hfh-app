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
import { SexTypes, UserProps, Application } from '../../../models';

export function UserForm() {
  const [userDataBool, setUserDataBool] = useState(false);
  const [userID, setUserID] = useState('');
  const [formData, setFormData] = useState({});
  const [previousDataId, setPreviousDataId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const userData = {
      ownerID: userID,
      name: form.elements.name.value,
      lastName: form.elements.lastName.value,
      dob: form.elements.dob.value,
      sex: form.elements.sex.value,
      phone: form.elements.phone.value,
      props: null,
      address: form.elements.address.value,
      zip: parseInt(form.elements.zip.value),
    };

    try {
      const newData = await DataStore.save(new UserProps(userData));
      setUserDataBool(true);

      if (previousDataId) {
        const previousData = await DataStore.query(UserProps, previousDataId);
        await DataStore.delete(previousData);
      }

      setPreviousDataId(newData.id);
    } catch (error) {
      console.log('Error saving user data:', error);
    }
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
          const previousData = userDataObject[0];
          setPreviousDataId(previousData.id);
          const userData = userDataObject[0];
          setFormData({
            name: userData.name,
            lastName: userData.lastName,
            dob: userData.dob,
            sex: userData.sex,
            phone: userData.phone,
            address: userData.address,
            zip: userData.zip,
          });
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
    e.target.value = formattedNumber;
  };

  // Delete previous data
  const deletePreviousData = async () => {
    try {
      const previousData = await DataStore.query(UserProps, previousDataId); // Get previous data
      await DataStore.delete(previousData); // Delete previous data
    } catch (error) {
      console.log('Error deleting previous data:', error);
    }
  };

  // Handle Edit button click
  const handleEditClick = async () => {
    if (previousDataId) {
      await deletePreviousData(); // Delete previous data
      setPreviousDataId(null); // Clear the previousDataId after deletion
    }
    setUserDataBool(false);
  };

  // Message to display if user data exists
  const message = (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      <Heading level="5" textAlign="center">
        You have an existing user information record
      </Heading>
      <Flex justifyContent="center" style={{ marginTop: '20px' }}>
        <Button
          onClick={handleEditClick}
          variation="primary"
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
          }}
        >
          Edit
        </Button>
      </Flex>
    </div>
  );

  const userForm = (
    <Flex width="100%" justifyContent="center">
      <Card width="100%" variation="elevated">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="30px">
            <TextField
              name="name"
              label="What is your name?"
              value={formData.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              isRequired
            />
            <TextField
              name="lastName"
              label="What is your last name?"
              value={formData.lastName || ''}
              onChange={(e) => handleFieldChange('lastName', e.target.value)}
              isRequired
            />
            <TextField
              name="dob"
              label="What is your date of birth?"
              type="date"
              value={formData.dob || ''}
              onChange={(e) => handleFieldChange('dob', e.target.value)}
              isRequired
            />
            <SelectField
              name="sex"
              label="What is your sex?"
              value={formData.sex || ''}
              onChange={(e) => handleFieldChange('sex', e.target.value)}
              isRequired
              placeholder="Select an option"
            >
              <option value={SexTypes.MALE}>Male</option>
              <option value={SexTypes.FEMALE}>Female</option>
              <option value={SexTypes.OTHER}>Other</option>
            </SelectField>
            <PhoneNumberField
              name="phone"
              defaultDialCode="+1"
              label="What is your phone number?"
              placeholder="234-567-8910"
              value={formData.phone || ''}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              isRequired
              type="tel"
            />
            <TextField
              name="address"
              label="What is your home address?"
              value={formData.address || ''}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              isRequired
            />
            <TextField
              name="zip"
              label="What is your zip code?"
              type="number"
              value={formData.zip || ''}
              onChange={(e) => handleFieldChange('zip', e.target.value)}
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

  // Handle field changes
  const handleFieldChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  // Render user form

  return (
    <Flex direction="column" width="100%">
      <Heading level="4" textAlign="center">
        User Information
      </Heading>
      {userDataBool ? message : userForm}
    </Flex>
  );
}
