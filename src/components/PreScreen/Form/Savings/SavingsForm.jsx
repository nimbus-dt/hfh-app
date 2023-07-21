/* eslint-disable react/prop-types */
import { Flex, Heading, Text, useBreakpointValue } from '@aws-amplify/ui-react';
import { DataStore, Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Application, SavingRecord, UserProps } from '../../../../models';
import { SavingsCreate } from './SavingsCreate';
import { SavingsList } from './SavingsList';

export function SavingsForm({ application, habitat }) {
  const [savings, setSavings] = useState([]);
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
    const institution = formFields.institution.value;
    const estimatedAmount = Number(
      Number(formFields.estimatedAmount.value).toFixed(2)
    );
    const ownerID = formFields.owner.value;

    await DataStore.save(
      new SavingRecord({
        ownerID,
        institution,
        estimatedAmount,
        applicationID: application?.id,
      })
    );

    e.target.reset();

    // Fetch the updated saving records
    fetchSavingRecords();
  };

  const fetchSavingRecords = async () => {
    try {
      const savingRecordObjects = await DataStore.query(SavingRecord, (c) =>
        c.applicationID.eq(application.id)
      );
      setSavings(savingRecordObjects);
    } catch (error) {
      console.log('Error retrieving SavingRecords', error);
    }
  };

  useEffect(() => {
    fetchSavingRecords();
  }, [application]);

  return (
    <Flex direction="column" width="100%">
      <Heading level="4" textAlign="center">
        Savings Information
      </Heading>
      <Text textAlign="center">
        Please list all saving records for your coapplicant and yourself.
      </Text>
      <SavingsList items={savings} sizeRenderer={sizeRenderer} />
      <SavingsCreate handleCreate={handleCreate} owners={owners} />
    </Flex>
  );
}
