import { useEffect, useState } from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Card,
  TextField,
  SelectField,
  Button,
  PhoneNumberField,
  Text,
  Heading,
} from '@aws-amplify/ui-react';
import { UserProps, SexTypes } from '../../../models';

export function FormUserForm() {
  /* CONSTS */
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userProps, setUserProps] = useState(null);
  const [identityIdField, setIdentityIdField] = useState(null);

  /* USE EFFECTS */

  // Check if user is signed in
  useEffect(() => {
    async function checkSignedIn() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });
        const result = await Auth.currentUserCredentials();
        setIdentityIdField(result?.identityId);
        setUser(currentUser);
      } catch (error) {
        navigate('../prelim/home');
      }
    }
    checkSignedIn();
  }, [navigate]);

  // Check is user has userProps
  useEffect(() => {
    async function checkUserProps() {
      try {
        const userPropsObject = await DataStore.query(UserProps, (c) =>
          c.ownerID.eq(user?.username)
        );
        if (userPropsObject.length !== 0) {
          navigate('../applications');
        }
      } catch (error) {
        console.log(`Error getting user props: ${error}`);
      }
    }
    checkUserProps();
  }, [navigate, user]);

  /* FUNCTIONS */
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const userPropsObject = Object.fromEntries(formData.entries());
    userPropsObject.zip = parseInt(userPropsObject.zip);
    userPropsObject.identityId = identityIdField;

    try {
      const newUserProps = await DataStore.save(
        new UserProps({
          ...userPropsObject,
          ownerID: user?.username,
        })
      );
      window.location.reload();
    } catch (error) {
      console.log(`Error saving user props: ${error}`);
    }
  }

  function handlePhoneNumberChange(e) {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    const formattedNumber = inputValue
      .substring(0, 10)
      .replace(/^(\d{3})/, '$1-') // Add dash after the first 3 digits
      .replace(/^(\d{3})-(\d{3})/, '$1-$2-'); // Add dash after the next 3 digits
    e.target.value = formattedNumber;
  }

  /* UI */
  const userForm = (
    <Flex width="100%" justifyContent="center">
      <Card width="100%" variation="elevated">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="30px">
            <TextField
              name="name"
              label="What is your full legal name?"
              placeholder="John William Doe"
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
              <option value={SexTypes.OTHER}>Other</option>
            </SelectField>
            <PhoneNumberField
              name="phone"
              defaultDialCode="+1"
              label="What is your phone number?"
              placeholder="234-567-8910"
              isRequired
              type="tel"
              // eslint-disable-next-line react/jsx-no-bind
              onChange={handlePhoneNumberChange}
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

            <TextField
              name="email"
              label="What email would you like to be contacted through?"
              type="email"
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
    <Card variation="elevated" width="80%">
      <Heading level="3" textAlign="center">
        User Information
      </Heading>
      <Text textAlign="center">Please fill out your personal information</Text>
      {userForm}
    </Card>
  );
}
