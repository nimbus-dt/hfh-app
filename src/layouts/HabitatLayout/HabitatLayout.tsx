import { Outlet, useParams } from 'react-router-dom';
import { Authenticator, Flex, Text } from '@aws-amplify/ui-react';
import CheckMaintenance from 'layouts/Maintenance/CheckMaintenance';
import useHabitat from 'hooks/utils/useHabitat';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify/datastore';
import { Habitat } from 'models';

const HabitatLayout = () => {
  const { habitat, setHabitat } = useHabitat();

  const [isLoading, setIsLoading] = useState(0);

  const { habitat: habitatUrlName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading((prevIsLoading) => prevIsLoading + 1);
        const habitatsResponse = await DataStore.query(Habitat, (c) =>
          c.urlName.eq(habitatUrlName)
        );

        const habitatObject = habitatsResponse[0];

        setHabitat(habitatObject);
        setIsLoading((prevIsLoading) => prevIsLoading - 1);
      } catch (error) {
        console.log(`Error fetching habitat: ${error}`);
      }
    };

    fetchData();
  }, [habitatUrlName, setHabitat]);

  if (isLoading) {
    return (
      <Flex
        direction="column"
        height="100vh"
        alignItems="center"
        padding="16px"
      >
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (!habitat) {
    return (
      <Flex
        direction="column"
        height="100vh"
        alignItems="center"
        padding="16px"
      >
        <Text>Habitat not found.</Text>
      </Flex>
    );
  }

  return (
    <CheckMaintenance>
      <Authenticator.Provider>
        <Outlet />
      </Authenticator.Provider>
    </CheckMaintenance>
  );
};

export default HabitatLayout;
