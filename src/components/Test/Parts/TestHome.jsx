import {
  View,
  Flex,
  Text,
  Heading,
  Button,
  Authenticator,
} from '@aws-amplify/ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import useHabitatByUrlName from 'hooks/services/useHabitatByUrlName';
import { CustomCard } from '../Reusable/CustomCard';

export function TestHome() {
  const navigate = useNavigate();
  const { habitat: habitatUrlName, isAuthenticated } = useParams();
  const { habitat, error } = useHabitatByUrlName({
    habitatUrlName,
  });

  if (error) {
    console.log('Error retrieving Habitat:', error.message);
  }

  const content = (
    <>
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
      </View>
      <Flex justifyContent="end" width="100%">
        <Button variation="primary" onClick={() => navigate('../terms')}>
          Next
        </Button>
      </Flex>
    </>
  );

  return (
    <Authenticator hideSignUp={isAuthenticated}>
      <CustomCard>{content}</CustomCard>
    </Authenticator>
  );
}
