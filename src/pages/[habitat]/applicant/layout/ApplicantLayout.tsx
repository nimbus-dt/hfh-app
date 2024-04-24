import { Flex, ScrollView } from '@aws-amplify/ui-react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';

const ApplicantLayout = () => (
  <Flex gap="0">
    <SideBar />
    <ScrollView backgroundColor="red" height="100vh" flex={1}>
      <Outlet />
    </ScrollView>
  </Flex>
);

export default ApplicantLayout;
