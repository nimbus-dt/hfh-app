import { Flex, Heading, ScrollView } from '@aws-amplify/ui-react';
import { Outlet, useParams } from 'react-router-dom';
import useHabitatByUrlName from 'hooks/services/useHabitatByUrlName';
import { TestNav } from './TestNav';
import { CustomCard } from '../Reusable/CustomCard';

export function TestLayout() {
  const { habitat: habitatUrlName } = useParams();
  const { habitat, error } = useHabitatByUrlName({
    habitatUrlName,
  });

  if (error) {
    console.log('Error retrieving Habitat:', error.message);
  }

  const content = (
    <Heading level={4} fontWeight="bold" textAlign="center">
      Homeownership Program Application
    </Heading>
  );

  return (
    <ScrollView height="100vh">
      <Flex
        direction="column"
        alignItems="center"
        backgroundColor="lightgray"
        minHeight="100vh"
        paddingBottom="1rem"
      >
        <TestNav />
        <CustomCard> {content} </CustomCard>
        <Outlet context={[habitat]} />
      </Flex>
    </ScrollView>
  );
}
