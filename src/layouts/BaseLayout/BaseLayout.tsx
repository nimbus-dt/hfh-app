/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Flex,
  ScrollView,
  useAuthenticator,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import { getRouteTitle } from 'utils/routes';
import { useUserQuery } from 'hooks/services';
import { initial } from 'lodash';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';

interface IProperties {
  variation: 'applicant' | 'affiliate';
  children: React.ReactNode;
  hideSideBar?: boolean;
}

const BaseLayout = ({ variation, children, hideSideBar }: IProperties) => {
  const location = useLocation();

  const [expandSideBar, setExpandSideBar] = useState(false);

  const isMobile = useBreakpointValue({
    base: true,
    medium: false,
  });

  const [title, setTitle] = useState('');

  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);

  // Get User
  const { data: userData } = useUserQuery({
    criteria: (c1: any) =>
      c1.and((c2: any) => {
        const criteriaArr = user ? [c2.owner.eq(user.username)] : [];
        return criteriaArr;
      }),
    paginationProducer: {},
    dependencyArray: [user],
  });

  const [initials, setInitials] = useState('');

  useEffect(() => {
    if (userData.length !== 0) {
      const tempUser = userData[0];
      const firstNameInit = tempUser.firstName.charAt(0);
      const lastNameInit = tempUser.lastName.charAt(0);
      setInitials(firstNameInit + lastNameInit);
    }
  }, [initials, userData]);

  const handleOnExpand = () => {
    if (isMobile) {
      setExpandSideBar((prevExpandSideBar) => !prevExpandSideBar);
    }
  };

  useEffect(() => {
    const newTitle = getRouteTitle(location.pathname);
    if (newTitle) {
      setTitle(newTitle);
    }
  }, [location.pathname]);

  return (
    <Flex gap="0">
      {!hideSideBar && (
        <SideBar
          pathname={location.pathname}
          mobile={typeof isMobile === 'boolean' && isMobile}
          expanded={expandSideBar}
          onExpand={handleOnExpand}
          variation={variation}
        />
      )}
      <ScrollView
        height="100vh"
        flex={1}
        backgroundColor="var(--amplify-colors-neutral-20)"
      >
        <TopBar
          title={title}
          initials={initials}
          mobile={typeof isMobile === 'boolean' && isMobile}
          onExpand={handleOnExpand}
        />
        {children}
      </ScrollView>
    </Flex>
  );
};

export default BaseLayout;
