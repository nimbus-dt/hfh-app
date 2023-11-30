/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { Flex, Card } from '@aws-amplify/ui-react';

export function CustomCard(props) {
  return (
    <Card
      variation="elevated"
      wrap
      width={{ base: '80%', medium: '500px' }}
      borderRadius="10px"
      height="100%"
      overflow="clip"
    >
      <Flex direction="column" width="100%" height="100%">
        {props.children}
      </Flex>
    </Card>
  );
}
