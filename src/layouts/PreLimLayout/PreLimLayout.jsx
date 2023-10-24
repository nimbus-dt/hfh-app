import { useParams, Outlet } from 'react-router-dom';
import { Flex, Card, Divider } from '@aws-amplify/ui-react';
import useHabitatByUrlName from 'hooks/services/useHabitatByUrlName';
import { LayoutHeader } from './LayoutHeader';

export function PreLimLayout() {
  const { habitat: habitatUrlName } = useParams();
  const { habitat, error } = useHabitatByUrlName({
    habitatUrlName,
  });

  if (error) {
    console.log('Error retrieving Habitat:', error.message);
  }

  return (
    <Card
      variation="outlined"
      wrap
      width={{ base: '80%', medium: '500px' }}
      marginBottom="30px"
    >
      <Divider marginBottom="10px" />

      <Flex direction="column" gap="xl">
        <LayoutHeader habitatName={habitat?.name} />

        <Outlet context={[habitat]} />
      </Flex>

      <Divider marginTop="20px" />
    </Card>
  );
}
