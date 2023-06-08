import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, Flex, Text, Heading, Link } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import { HouseholdMember, DebtRecord, UserProps } from '../../../../models';

function DebtDetail({ item, sizeRenderer }) {
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

  const deleteObject = useCallback(async () => {
    try {
      await DataStore.delete(DebtRecord, item.id);
    } catch (error) {
      console.error('An error occurred while deleting the Debt Record:', error);
    }
  }, [item.id]);

  return (
    <Card variation="elevated" width={sizeRenderer ? '80%' : '300px'}>
      <Flex direction="column" gap="1px">
        <Heading level="4">
          Owner: {names.name} {names.lastName}
        </Heading>
        <Flex gap="5px">
          <Text fontWeight="bold">Type of debt:</Text>
          <Text>{item.TypeofDebt}</Text>
        </Flex>
        <Flex gap="5px">
          <Text fontWeight="bold">Is this a Monthly Recurrence:</Text>
          <Text>{item.MonthlyRecurrence}</Text>
        </Flex>
        <Flex gap="5px">
          <Text fontWeight="bold">Estimated amount:</Text>
          <Text>$ {item.estimatedAmount}</Text>
        </Flex>
        <Link onClick={deleteObject}>Delete</Link>
      </Flex>
    </Card>
  );
}

DebtDetail.propTypes = {
  item: PropTypes.shape({
    ownerID: PropTypes.string.isRequired,
    TypeofDebt: PropTypes.string.isRequired,
    MonthlyRecurrence: PropTypes.string.isRequired,
    estimatedAmount: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  sizeRenderer: PropTypes.bool.isRequired,
};

export default DebtDetail;
