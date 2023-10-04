import PropTypes from 'prop-types';
import { Flex, Text } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import { formatRelationshipValue, formatSexValue } from 'utils/formatters';
import { HouseholdMember } from '../../../models';
import RecordDetail from '../../RecordDetail';

export function HouseholdDetail({ item, sizeRenderer, isEditable }) {
  const deleteObject = async () => {
    try {
      await DataStore.delete(HouseholdMember, (member) =>
        member.id.eq(item.id)
      );
    } catch (error) {
      console.log('Error deleting record', error);
    }
  };

  return (
    <RecordDetail
      title={item.name}
      onDelete={deleteObject}
      sizeRenderer={sizeRenderer}
      isEditable={isEditable}
      renderBody={() => (
        <>
          <Flex gap="5px">
            <Text fontWeight="bold">Date of birth:</Text>
            <Text>{item.dateOfBirth}</Text>
          </Flex>

          <Flex gap="5px">
            <Text fontWeight="bold">Sex:</Text>
            <Text>{formatSexValue(item.sex)}</Text>
          </Flex>

          <Flex gap="5px">
            <Text fontWeight="bold">Relationship:</Text>
            <Text>{formatRelationshipValue(item.relationship)}</Text>
          </Flex>

          <Flex gap="5px">
            <Text fontWeight="bold">Is CoApplicant:</Text>
            <Text>{item.isCoapplicant ? 'Yes' : 'No'}</Text>
          </Flex>
        </>
      )}
    />
  );
}

HouseholdDetail.propTypes = {
  item: PropTypes.object.isRequired,
  sizeRenderer: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool,
};
