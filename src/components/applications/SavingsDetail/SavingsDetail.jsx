import PropTypes from 'prop-types';
import { Flex, Text } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { HouseholdMember, SavingRecord, UserProps } from '../../../models';
import RecordDetail from '../../RecordDetail';

export function SavingsDetail({ item, sizeRenderer, isEditable }) {
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
      });
    };

    fetchOwner();
  }, [item.ownerID]);

  const deleteObject = async () => {
    try {
      await DataStore.delete(SavingRecord, item.id);
    } catch (error) {
      console.error(
        'An error occurred while deleting the Saving Record :',
        error
      );
    }
  };

  return (
    <RecordDetail
      title={`Owner: ${names.name}`}
      onDelete={deleteObject}
      sizeRenderer={sizeRenderer}
      isEditable={isEditable}
      renderBody={() => (
        <>
          <Flex gap="5px">
            <Text fontWeight="bold">Institution:</Text>
            <Text>{item.institution}</Text>
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

SavingsDetail.propTypes = {
  item: PropTypes.object,
  sizeRenderer: PropTypes.bool,
  isEditable: PropTypes.bool,
};
