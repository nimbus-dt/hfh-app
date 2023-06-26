/* eslint-disable react/prop-types */
import { Flex, Heading, Text, useBreakpointValue } from '@aws-amplify/ui-react';
import { DataStore, Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Application, DebtRecord, UserProps } from '../../../../models';
import { DebtCreate } from './DebtCreate';
import { DebtList } from './DebtList';

export function DebtForm({ application, habitat }) {
  const [debt, setDebt] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });

        const userProps = await DataStore.query(UserProps, (c) =>
          c.ownerID.eq(currentUser.username)
        );

        const applicationObject = await DataStore.query(Application, (c) =>
          c.ownerID.eq(currentUser.username)
        );

        const ownersArray = [userProps[0]];

        const householdMembersCollection =
          await applicationObject[0].HouseholdMembers.toArray();

        if (householdMembersCollection.length > 0) {
          const coapplicants = householdMembersCollection.filter(
            (member) => member.isCoapplicant
          );

          if (coapplicants.length > 0) {
            ownersArray.push(...coapplicants);
          }
        }

        setOwners(ownersArray);
      } catch (error) {
        console.log('Error retrieving HouseholdMembers', error);
      }
    };

    fetchUser();
  }, [application]);

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

    const formFields = e.target.elements;
    const monthlyRecurrence = Number(formFields.monthlyRecurrence.value);
    const typeOfDebt = formFields.typeOfDebt.value;
    const estimatedAmount = Number(formFields.estimatedAmount.value);
    const ownerID = formFields.owner.value;

    await DataStore.save(
      new DebtRecord({
        ownerID,
        monthlyRecurrence, // Update the variable name here
        typeOfDebt,
        estimatedAmount,
        applicationID: application?.id,
      })
    );
    e.target.reset();

    // Fetch the updated debt records
    fetchDebtRecords();
  };

  const fetchDebtRecords = async () => {
    try {
      const DebtRecordObjects = await DataStore.query(DebtRecord, (c) =>
        c.applicationID.eq(application.id)
      );
      setDebt(DebtRecordObjects);
    } catch (error) {
      console.log('Error retrieving DebtRecords', error);
    }
  };

  useEffect(() => {
    fetchDebtRecords();
  }, [application]);

  console.log(owners);

  return (
    <Flex direction="column" width="100%">
      <Heading level="4" textAlign="center">
        Debt Information
      </Heading>
      <Text textAlign="center">
        Please list all debt records for your coapplicant and yourself.
      </Text>
      <DebtList items={debt} sizeRenderer={sizeRenderer} />
      <DebtCreate
        handleCreate={handleCreate}
        owners={owners}
        habitat={habitat}
        application={application}
      />
    </Flex>
  );
}
