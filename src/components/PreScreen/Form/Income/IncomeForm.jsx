/* eslint-disable react/prop-types */
import { Flex, Heading, Text, useBreakpointValue } from '@aws-amplify/ui-react';
import { DataStore, Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { UserProps, Application } from '../../../../models';
import { IncomeCreate } from './IncomeCreate';
import { IncomeList } from './IncomeList';

export function IncomeForm({ habitat }) {
  const [owners, setOwners] = useState([]);
  const [user, setUser] = useState(null);
  const [application, setApplication] = useState(null);

  // Owners
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });
        setUser(currentUser);

        const userProps = await DataStore.query(UserProps, (c) =>
          c.ownerID.eq(currentUser.username)
        );

        const applicationObject = await DataStore.query(Application, (c) =>
          c.ownerID.eq(currentUser.username)
        );

        setApplication(applicationObject[0]);

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

  return (
    <Flex direction="column" width="100%">
      <Heading level="4" textAlign="center">
        Income Information
      </Heading>
      <Text textAlign="center">
        Please list all income records for your coapplicant and yourself.
      </Text>
      <IncomeCreate
        owners={owners}
        habitat={habitat}
        application={application}
      />
    </Flex>
  );
}
