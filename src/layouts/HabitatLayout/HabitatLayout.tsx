import { Authenticator } from '@aws-amplify/ui-react';
import { Outlet } from 'react-router-dom';

const HabitatLayout = () => (
  <Authenticator.Provider>
    <Outlet />
  </Authenticator.Provider>
);

export default HabitatLayout;
