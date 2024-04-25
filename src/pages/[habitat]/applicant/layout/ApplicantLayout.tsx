import { Flex, ScrollView } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { getRouteTitle } from 'utils/routes';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';

const ApplicantLayout = () => {
  const [title, setTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const newTitle = getRouteTitle(location.pathname);
    if (newTitle) {
      setTitle(newTitle);
    }
  }, [location.pathname]);

  return (
    <Flex gap="0">
      <SideBar />
      <ScrollView
        height="100vh"
        flex={1}
        backgroundColor="var(--amplify-colors-neutral-20)"
      >
        <TopBar title={title} initials="GA" />
        <Outlet />
      </ScrollView>
    </Flex>
  );
};

export default ApplicantLayout;
