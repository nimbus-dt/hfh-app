import { Outlet } from 'react-router-dom';
import { Flex } from '@aws-amplify/ui-react';
import { ApplicantPrescreenNavBar } from './ApplicantPreScreenNavBar';

export function ApplicantPrescreenLayout() {
  return (
    <Flex direction="column" alignItems="center">
      <ApplicantPrescreenNavBar />
      <Outlet />
    </Flex>
  );
}
