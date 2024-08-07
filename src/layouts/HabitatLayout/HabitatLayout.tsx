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
    try {
      setIsLoading((prevIsLoading) => prevIsLoading + 1);

      const sub = DataStore.observeQuery(Habitat, (c) =>
        c.urlName.eq(habitatUrlName)
      ).subscribe(({ items }) => setHabitat(items[0]));

      setIsLoading((prevIsLoading) => prevIsLoading - 1);

      console.log(sub);

      return () => {
        sub.unsubscribe();
      };
    } catch (error) {
      console.log(`Error fetching habitat: ${error}`);
    }
  }, [habitatUrlName]);

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

  return (
    <CheckMaintenance>
      <Authenticator.Provider>
        <Outlet />
      </Authenticator.Provider>
    </CheckMaintenance>
  );
};

export default HabitatLayout;
