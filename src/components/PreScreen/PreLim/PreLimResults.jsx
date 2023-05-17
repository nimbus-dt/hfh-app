import {
  Heading,
  Button,
  Flex,
  View,
  Text,
  ScrollView,
} from '@aws-amplify/ui-react';
import { useOutletContext } from 'react-router-dom';

export function PreLimResults() {
  const [habitat] = useOutletContext();

  return (
    <View as="div">
      <Flex marginBottom="30px" direction="column" gap="xl">
        <Heading level="4">Terms and Services</Heading>
        <ScrollView height="50%" width="100%">
          {habitat?.props?.prePreScreen?.prePreScreenTerms?.map(
            (item, index) => (
              <View as="div" key={index}>
                <Heading level="5">{item.title}</Heading>
                <Text>{item.body}</Text>
                <br />
              </View>
            )
          )}
        </ScrollView>
      </Flex>
      <Flex direction="column">
        <Button variation="primary" width="fit-content">
          Next
        </Button>
      </Flex>
    </View>
  );
}
