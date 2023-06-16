/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import { Card, Flex, Text, Heading, Link } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import { HouseholdMember } from '../../../../models';

export function HouseholdDetail({ item, sizeRenderer }) {
  async function deleteObject() {
    await DataStore.delete(HouseholdMember, (member) => member.id.eq(item.id));
  }

  return (
    <Card variation="elevated" width={sizeRenderer ? '80%' : '300px'}>
      <Flex direction="column" gap="1px">
        <Heading level="4">
          {item.name} {item.lastName}
        </Heading>
        <Flex gap="5px">
          <Text fontWeight="bold">Date of birth:</Text>
          <Text>{item.dateOfBirth}</Text>
        </Flex>
        <Flex gap="5px">
          <Text fontWeight="bold">Sex:</Text>
          <Text>{item.sex}</Text>
        </Flex>
        <Flex gap="5px">
          <Text fontWeight="bold">Relationship:</Text>
          <Text>{item.relationship}</Text>
        </Flex>
        <Flex gap="5px">
          <Text fontWeight="bold">Is CoApplicant:</Text>
          <Text>{String(item.isCoapplicant)}</Text>
        </Flex>
        <Link onClick={deleteObject}>Delete</Link>
      </Flex>
    </Card>
  );
}
