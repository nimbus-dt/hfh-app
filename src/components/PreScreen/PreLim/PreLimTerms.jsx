import {
  Heading,
  Button,
  Flex,
  View,
  Text,
  ScrollView,
} from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';

export function PreLimTerms() {
  const [habitat] = useOutletContext();
  const navigate = useNavigate();

  return (
    <View as="div">
      <Flex marginBottom="30px" direction="column" gap="xl">
        <Heading level="4" marginBottom="-30px">
          Terms and Services
        </Heading>
        <Text>Please take a moment to read our terms and services:</Text>
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
        <Button
          variation="primary"
          width="fit-content"
          onClick={() => navigate('../questions')}
        >
          Next
        </Button>
      </Flex>
    </View>
  );
}
