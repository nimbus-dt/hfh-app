/* eslint-disable react/prop-types */
import { Card, Flex, Text, Heading, Button } from '@aws-amplify/ui-react';
import { HiXMark } from 'react-icons/hi2';
import { useEffect, useState } from 'react';
import { DataStore, Storage } from 'aws-amplify';
import { HouseholdMember, IncomeRecord, UserProps } from '../../../../models';
import { downloadWithUrl } from '../../../../utils/files';

export function IncomeDetail({ item, sizeRenderer, application }) {
  const [names, setNames] = useState({});

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

  const deleteObject = async () => {
    try {
      await DataStore.delete(IncomeRecord, item.id);
      window.location.reload();
    } catch (error) {
      console.error(
        'An error occurred while deleting the Saving Record :',
        error
      );
    }
  };

  const downloadFile = async (fileKey) => {
    const owner = application?.ownerID;

    // get user props
    const userProps = await DataStore.query(UserProps, (c) =>
      c.ownerID.eq(owner)
    );

    const identity = userProps[0]?.identityID;

    const signedURL = await Storage.get(fileKey, {
      level: 'protected',
      identityId: identity,
    });

    downloadWithUrl(signedURL);
  };

  return (
    <Card variation="elevated" width={sizeRenderer ? '100%' : '300px'}>
      <Flex direction="column" gap="1px">
        <Flex justifyContent="space-between" gap="0.5rem">
          <Heading level="4">Owner: {names.name}</Heading>

          <Button
            title="Remove income record"
            shrink="0rem"
            type="button"
            variation="warning"
            height="2rem"
            width="2rem"
            padding="0rem"
            onClick={deleteObject}
          >
            <HiXMark size={20} />
          </Button>
        </Flex>

        <Flex gap="5px">
          <Text fontWeight="bold">Employer:</Text>
          <Text>{item.employer}</Text>
        </Flex>

        <Flex gap="5px">
          <Text fontWeight="bold">Monthly income:</Text>
          <Text>${parseInt(item.estimatedMonthlyIncome)}</Text>
        </Flex>

        <Flex gap="5px">
          <Text fontWeight="bold">Employment Time:</Text>
          <Text>{parseInt(item.employmentTime)} months</Text>
        </Flex>

        <Flex direction="column" gap="5px">
          <Text fontWeight="bold">Proof of Income:</Text>

          <Flex
            direction="column"
            gap="0.25rem"
            maxHeight="7rem"
            overflow="auto"
          >
            <ul style={{ margin: 0 }}>
              {item.proofOfIncome.map((fileKey, index) => (
                <li key={fileKey}>
                  <Button
                    type="button"
                    title={`Download file #${index + 1}`}
                    variation="link"
                    padding="0rem 0.55rem 0rem 0.55rem"
                    onClick={() => downloadFile(fileKey)}
                  >
                    File #{index + 1}
                  </Button>
                </li>
              ))}
            </ul>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
