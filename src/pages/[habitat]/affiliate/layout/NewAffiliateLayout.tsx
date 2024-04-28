import { Flex, ScrollView, useBreakpointValue } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { getRouteTitle } from 'utils/routes';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';

const NewAffiliateLayout = () => {
  const [expandSideBar, setExpandSideBar] = useState(false);
  const isMobile = useBreakpointValue({
    base: true,
    medium: false,
  });
  const [title, setTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const newTitle = getRouteTitle(location.pathname);
    if (newTitle) {
      setTitle(newTitle);
    }
  }, [location.pathname]);

  const handleOnExpand = () => {
    if (isMobile) {
      setExpandSideBar((prevExpandSideBar) => !prevExpandSideBar);
    }
  };

  return (
    <Flex gap="0">
      <SideBar
        mobile={typeof isMobile === 'boolean' && isMobile}
        expanded={expandSideBar}
        onExpand={handleOnExpand}
        pathname={location.pathname}
      />
      <ScrollView
        height="100vh"
        flex={1}
        backgroundColor="var(--amplify-colors-neutral-20)"
      >
        <TopBar
          title={title}
          initials="GA"
          mobile={typeof isMobile === 'boolean' && isMobile}
          onExpand={handleOnExpand}
        />
        <Outlet />
      </ScrollView>
    </Flex>
  );
};

export default NewAffiliateLayout;
