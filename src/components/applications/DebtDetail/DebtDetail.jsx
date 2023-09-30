import PropTypes from 'prop-types';
import React, { useEffect, useState, useCallback } from 'react';
import { Flex, Text } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import { HouseholdMember, DebtRecord, UserProps } from '../../../models';
import RecordDetail from '../../RecordDetail';

/**
 * DebtDetail is a component that manages the debt detail. It provides a way to add / remove items from the database without relying on data store.
 *
 *
 * @return { ReactElement } React element that manages the debt detail and allows you to interact with it
 */
export function DebtDetail({ item, sizeRenderer, isEditable }) {
  const [names, setNames] = useState({});

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        let ownerObject = await DataStore.query(UserProps, item.ownerID);

        // Set the owner object s names.
        if (ownerObject) {
          setNamesFromObject(ownerObject);
        } else {
          ownerObject = await DataStore.query(HouseholdMember, item.ownerID);

          // Set the names of the owner object.
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
    <RecordDetail
      title={`Owner: ${names.name}`}
      onDelete={deleteObject}
      sizeRenderer={sizeRenderer}
      isEditable={isEditable}
      renderBody={() => (
        <>
          <Flex gap="5px">
            <Text fontWeight="bold">Type of debt:</Text>
            <Text>
              {String(item.typeOfDebt)
                .toLowerCase()
                .split('_')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </Text>
          </Flex>
          <Flex gap="5px">
            <Text fontWeight="bold">Monthly Debt Amount:</Text>
            <Text>${item.monthlyRecurrence}</Text>
          </Flex>
          <Flex gap="5px">
            <Text fontWeight="bold">Estimated amount:</Text>
            <Text>${item.estimatedAmount}</Text>
          </Flex>
        </>
      )}
    />
  );
}

DebtDetail.propTypes = {
  item: PropTypes.object,
  sizeRenderer: PropTypes.bool,
  isEditable: PropTypes.bool,
};
