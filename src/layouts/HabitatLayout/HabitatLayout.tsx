import { Await, Outlet, useLoaderData, useParams } from 'react-router-dom';
import { Authenticator, Flex, Text } from '@aws-amplify/ui-react';
import CheckMaintenance from 'layouts/Maintenance/CheckMaintenance';
import useHabitat from 'hooks/utils/useHabitat';
import { Suspense, useEffect } from 'react';
import { Habitat } from 'models';

const HabitatLayout = () => {
  const { habitat } = useLoaderData() as { habitat: Habitat };

  const { setHabitat } = useHabitat();

  useEffect(() => setHabitat(habitat), [habitat, setHabitat]);

  return (
    <CheckMaintenance>
      <Outlet />
    </CheckMaintenance>
  );
};

export default HabitatLayout;
