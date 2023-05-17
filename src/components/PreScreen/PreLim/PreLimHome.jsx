import { Heading, Button, Flex, View, Text } from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';

export function PreLimHome() {
  const [habitat] = useOutletContext();
  const navigate = useNavigate();
  return (
    <View as="div">
      <Flex marginBottom="30px" direction="column" gap="xl">
        {habitat?.props?.prePreScreen?.prePreScreenHomeText?.map(
          (item, index) => (
            <View as="div" key={index}>
              <Heading level="5">{item.title}</Heading>
              <Text>{item.text}</Text>
            </View>
          )
        )}
      </Flex>
      <Flex direction="column">
        <Heading level="4">Let's get started!</Heading>
        <Button
          variation="primary"
          width="fit-content"
          onClick={() => navigate('../terms')}
        >
          Next
        </Button>
      </Flex>
    </View>
  );
}
