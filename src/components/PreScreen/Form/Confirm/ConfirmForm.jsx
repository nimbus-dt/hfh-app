import React, { useEffect, useState } from 'react';
import { Flex, Button, Heading, Card, Text } from '@aws-amplify/ui-react';
import { Auth, DataStore } from 'aws-amplify';
import { HouseholdData } from './HouseholdData';
import {
  HouseholdMember,
  DebtRecord,
  SavingRecord,
  UserProps,
  Application,
} from '../../../../models';

export function ConfirmForm({ application }) {
  async function submitApplication() {
    const applicationObject = await DataStore.query(
      Application,
      application.id
    );
    await DataStore.save(
      Application.copyOf(applicationObject, (item) => {
        item.submitted = true;
      })
    );
  }

  return (
    <Card variation="elevated">
      <Heading textAlign="center">Confirmation Form</Heading>

      {/* Display user information */}
      <Flex direction="column" gap="20px">
        {/* Display user form data */}
        {/* e.g., <UserForm userData={userData} /> */}
      </Flex>

      {/* Display household information */}
      <Flex direction="column" gap="20px">
        {/* Display household form data */}
        {/* e.g., <HouseholdForm householdData={householdData} /> */}
      </Flex>

      {/* Display savings information */}
      <Flex direction="column" gap="20px">
        {/* Display savings form data */}
        {/* e.g., <SavingsForm savingsData={savingsData} /> */}
      </Flex>

      {/* Display debt information */}
      <Flex direction="column" gap="20px">
        {/* Display debt form data */}
        {/* e.g., <DebtForm debtData={debtData} /> */}
      </Flex>

      {/* Add a button to submit the form */}
      <Button
        type="submit"
        variation="primary"
        onClick={() => {
          submitApplication();
        }}
      >
        Confirm
      </Button>
    </Card>
  );
}

export default ConfirmForm;
