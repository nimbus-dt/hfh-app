import React, { useEffect, useState } from 'react';
import { Flex, Button, Heading, Card, Text } from '@aws-amplify/ui-react';
import { Auth, DataStore } from 'aws-amplify';
import { HouseholdData } from './HouseholdData';
import {
  HouseholdMember,
  DebtRecord,
  SavingRecord,
  UserProps,
} from '../../../../models';

export function ConfirmForm() {
  const [user, setUser] = useState(null);
  const [householdMembers, setHouseholdMembers] = useState([]);
  const [debts, setDebts] = useState([]);
  const [savings, setSavings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        const userData = await DataStore.query(
          UserProps,
          currentUser.attributes.sub
        );
        const householdMembersData = await DataStore.query(HouseholdMember);
        const debtsData = await DataStore.query(DebtRecord);
        const savingsData = await DataStore.query(SavingRecord);

        setUser(userData);
        setHouseholdMembers(householdMembersData);
        setDebts(debtsData);
        setSavings(savingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!user || !householdMembers.length || !debts.length || !savings.length) {
    return <text> Loading...</text>; // Return a loading state or placeholder while data is being fetched
  }

  return (
    <Card variation="elevated">
      <Heading textAlign="center">Confirmation Form</Heading>

      {/* Display user information */}
      <Flex direction="column" gap="10px">
        <Text>{`Name: ${user.name}`}</Text>
        <Text>{`Last Name: ${user.lastName}`}</Text>
        <Text>{`Sex: ${user.sex}`}</Text>
        <Text>{`Phone: ${user.phone}`}</Text>
        <Text>{`Address: ${user.address}`}</Text>
        <Text>{`Zip: ${user.zip}`}</Text>
      </Flex>

      {/* Display household information */}
      <Flex direction="column" gap="20px">
        <Heading level="3">Household Information</Heading>
        <HouseholdData householdMembers={householdMembers} />
      </Flex>

      {/* Display savings information */}
      <Flex direction="column" gap="20px">
        <Heading level="3">Savings Information</Heading>
        {savings.map((savingsRecord) => (
          <Card key={savingsRecord.id} variation="outlined">
            <Text>{`Owner: ${savingsRecord.ownerID}`}</Text>
            <Text>{`Institution: ${savingsRecord.institution}`}</Text>
            <Text>{`Estimated Amount: ${savingsRecord.estimatedAmount}`}</Text>
          </Card>
        ))}
      </Flex>

      {/* Display debt information */}
      <Flex direction="column" gap="20px">
        <Heading level="3">Debt Information</Heading>
        {debts.map((debtRecord) => (
          <Card key={debtRecord.id} variation="outlined">
            <Text>{`Monthly Recurrence: ${debtRecord.monthlyRecurrence}`}</Text>
            <Text>{`Type of Debt: ${debtRecord.typeOfDebt}`}</Text>
            <Text>{`Estimated Amount: ${debtRecord.estimatedAmount}`}</Text>
          </Card>
        ))}
      </Flex>

      {/* Add a button to submit the form */}
      <Button type="submit" variation="primary">
        Confirm
      </Button>
    </Card>
  );
}

export default ConfirmForm;
