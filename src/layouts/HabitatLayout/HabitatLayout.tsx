import { Outlet } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';

import CheckMaintenance from 'layouts/Maintenance/CheckMaintenance';

const HabitatLayout = () => (
  <CheckMaintenance>
    <Authenticator.Provider>
      <Outlet />
    </Authenticator.Provider>
  </CheckMaintenance>
);

export default HabitatLayout;
