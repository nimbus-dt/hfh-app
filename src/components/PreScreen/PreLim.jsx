import { Flex, Card, Heading, Divider } from '@aws-amplify/ui-react';
import { useOutletContext } from 'react-router-dom';

export function PreLim() {
  const [habitat] = useOutletContext();
  const title = (
    <Flex direction="column">
      <Heading level={4}>{habitat.name}</Heading>
      <Heading level={4} marginTop="-10px">
        Habitat for Humanity
      </Heading>
      <Heading level={4} marginTop="-10px" marginBottom="10px">
        PreScreen Form
      </Heading>
    </Flex>
  );
  const body = <Flex marginBottom="19">Some nice text</Flex>;
  return (
    <Card variation="outlined" wrap width={{ base: '80%', medium: '500px' }}>
      {title}
      <Divider marginBottom="10px" />
      {body}
    </Card>
  );
}
