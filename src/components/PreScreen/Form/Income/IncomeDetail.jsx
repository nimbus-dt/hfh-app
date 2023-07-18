/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import { Card, Flex, Text, Heading, Link } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { DataStore, Storage } from 'aws-amplify';
import { HouseholdMember, IncomeRecord, UserProps } from '../../../../models';

export function IncomeDetail({ item, sizeRenderer, application }) {
  const [names, setNames] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function getFile() {
      const owner = application?.ownerID;

      // get user props
      const userProps = await DataStore.query(UserProps, (c) =>
        c.ownerID.eq(owner)
      );

      const identity = userProps[0]?.identityID;

      const result = await Storage.get(item.proofOfIncome[0], {
        level: 'protected',
        identityId: identity,
      });

      setFile(result);
    }
    getFile();
  }, [application?.ownerID, item.proofOfIncome]);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        let ownerObject = await DataStore.query(UserProps, item.ownerID);

        if (ownerObject) {
          setNamesFromObject(ownerObject);
        } else {
          ownerObject = await DataStore.query(HouseholdMember, item.ownerID);

          if (ownerObject) {
            setNamesFromObject(ownerObject);
          } else {
            console.log('No owner object found.');
            // Handle case when no owner object is found
          }
        }
      } catch (error) {
        console.log('Error retrieving owner object:', error);
        // Handle error when querying owner object
      }
    };

    const setNamesFromObject = (object) => {
      setNames({
        name: object.name,
        lastName: object.lastName,
      });
    };

    fetchOwner();
  }, [item.ownerID]);

  async function deleteObject() {
    try {
      await DataStore.delete(IncomeRecord, item.id);
      window.location.reload();
    } catch (error) {
      console.error(
        'An error occurred while deleting the Saving Record :',
        error
      );
    }
  }

  return (
    <Card variation="elevated" width={sizeRenderer ? '80%' : '300px'}>
      <Flex direction="column" gap="1px">
        <Heading level="4">Owner: {names.name}</Heading>
        <Flex gap="5px">
          <Text fontWeight="bold">Employer:</Text>
          <Text>{item.employer}</Text>
        </Flex>
        <Flex gap="5px">
          <Text fontWeight="bold">Monthly income:</Text>
          <Text>$ {parseInt(item.estimatedMonthlyIncome)}</Text>
        </Flex>
        <Flex gap="5px">
          <Text fontWeight="bold">Employment Time:</Text>
          <Text>{parseInt(item.employmentTime)} months</Text>
        </Flex>
        <Flex gap="5px">
          <Link fontWeight="bold" href={file}>
            Proof of Income
          </Link>
        </Flex>
        <Link onClick={deleteObject}>Delete</Link>
      </Flex>
    </Card>
  );
}
