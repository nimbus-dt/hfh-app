import PropTypes from 'prop-types';
import { Flex, Text } from '@aws-amplify/ui-react';
import RecordDetail from 'components/RecordDetail';

export function MemberDetails({ item, sizeRenderer, isEditable }) {
  return (
    <RecordDetail
      title={item.props.fullName}
      sizeRenderer={sizeRenderer}
      isEditable={isEditable}
      renderBody={() => (
        <>
          <Flex gap="5px">
            <Text fontWeight="bold">Date of birth:</Text>
            <Text>{item.props.birthDay}</Text>
          </Flex>

          <Flex gap="5px">
            <Text fontWeight="bold">Sex:</Text>
            <Text>{item.props.sex}</Text>
          </Flex>

          <Flex gap="5px">
            <Text fontWeight="bold">Relationship:</Text>
            <Text>{item.props.relationship}</Text>
          </Flex>
        </>
      )}
    />
  );
}

MemberDetails.propTypes = {
  item: PropTypes.object.isRequired,
  sizeRenderer: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool,
};
