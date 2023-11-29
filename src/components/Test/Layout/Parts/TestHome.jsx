import { View, Flex, Text, Heading } from '@aws-amplify/ui-react';
import { useParams } from 'react-router-dom';
import useHabitatByUrlName from 'hooks/services/useHabitatByUrlName';

export function TestHome() {
  const { habitat: habitatUrlName } = useParams();
  const { habitat, error } = useHabitatByUrlName({
    habitatUrlName,
  });

  if (error) {
    console.log('Error retrieving Habitat:', error.message);
  }

  return (
    <View as="div">
      <View as="div" marginBottom="30px">
        <Heading level="3" fontWeight>
          Homeownership Application
        </Heading>
      </View>
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
  );
}
