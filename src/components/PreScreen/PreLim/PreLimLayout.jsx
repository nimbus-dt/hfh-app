import { useParams, Outlet } from 'react-router-dom';
import { Flex, Heading, Card, Divider } from '@aws-amplify/ui-react';
import { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Habitat } from '../../../models';

export function PreLimLayout() {
  const [habitat, setHabitat] = useState({});
  const urlName = useParams().habitat;

  useEffect(() => {
    async function fetchHabitat() {
      try {
        const habitatObject = await DataStore.query(Habitat, (c) =>
          c.urlName.eq(urlName)
        );
        setHabitat(habitatObject[0]);
      } catch (error) {
        console.log('Error retrieving Habitat', error);
      }
    }
    fetchHabitat();
  }, [urlName]);

  const title = (
    <Flex direction="column">
      <Heading level={3} fontWeight="bold">
        {habitat?.name}
      </Heading>
      <Heading level={3} marginTop="-10px" fontWeight="bold">
        Habitat for Humanity
      </Heading>
      <Heading level={3} marginTop="-10px" fontWeight="bold">
        PreScreen Form
      </Heading>
    </Flex>
  );

  return (
    <Card
      variation="outlined"
      wrap
      width={{ base: '80%', medium: '500px' }}
      marginBottom="30px"
    >
      <Divider marginBottom="10px" />
      <Flex direction="column" gap="xl">
        {title}
        <Outlet context={[habitat, setHabitat]} />
      </Flex>
      <Divider marginTop="20px" />
    </Card>
  );
}
