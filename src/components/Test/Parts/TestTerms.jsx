import { Heading, Flex, View, Text, Button } from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { CustomCard } from '../Reusable/CustomCard';

export function TestTerms() {
  const [habitat] = useOutletContext();
  const navigate = useNavigate();

  const content = (
    <>
      <View as="div">
        <Flex marginBottom="30px" direction="column" gap="xl">
          <Heading level="4" fontWeight="bold" marginBottom="-30px">
            Terms and Services
          </Heading>
          <Text>Please take a moment to read our terms and services:</Text>
          {habitat?.props?.prePreScreen?.prePreScreenTerms?.map(
            (item, index) => (
              <View as="div" key={index}>
                <Heading level="5">{item.title}</Heading>
                <Text>{item.body}</Text>
                <br />
              </View>
            )
          )}
        </Flex>
      </View>
      <Flex width="100%" justifyContent="space-between">
        <Button variation="primary" onClick={() => navigate('../home')}>
          Back
        </Button>
        <Button
          variation="primary"
          onClick={() => navigate('../applicant-info')}
        >
          Next
        </Button>
      </Flex>
    </>
  );

  return <CustomCard>{content}</CustomCard>;
}
