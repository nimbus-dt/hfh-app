import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useRoutes from 'hooks/utils/useRoutes/useRoutes';
import { useAuthenticator, useBreakpointValue } from '@aws-amplify/ui-react';
import { getRouteTitle } from 'utils/routes';
import { useUserQuery } from 'hooks/services';
import { LazyUser } from 'models';
import { RecursiveModelPredicate } from '@aws-amplify/datastore';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import styles from './BaseLayout.module.css';

interface IProperties {
  variation: 'applicant' | 'affiliate';
  children: React.ReactNode;
  hideSideBar?: boolean;
}

const BaseLayout = ({ variation, children, hideSideBar }: IProperties) => {
  const location = useLocation();
  const ROUTES = useRoutes();

  const title = getRouteTitle(location.pathname, ROUTES);

  const isMobile = useBreakpointValue({
    base: true,
    medium: false,
  });

  const { user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);

  const { data: userData } = useUserQuery({
    criteria: (c1: RecursiveModelPredicate<LazyUser>) =>
      c1.and((c2) => {
        const criteriaArr = user ? [c2.owner.eq(user.username as string)] : [];
        return criteriaArr;
      }),
    paginationProducer: {},
    dependencyArray: [user],
  });

  const [expandSideBar, setExpandSideBar] = useState(false);

  const handleOnExpand = () => {
    if (isMobile) {
      setExpandSideBar((prevExpandSideBar) => !prevExpandSideBar);
    }
  };

  let initials = '';

  if (userData) {
    const tempUser = userData[0];
    const firstNameInit = tempUser?.firstName.charAt(0);
    const lastNameInit = tempUser?.lastName.charAt(0);
    initials = firstNameInit + lastNameInit;
  }

  return (
    <div className={styles.layout}>
      {!hideSideBar && (
        <SideBar
          pathname={location.pathname}
          mobile={typeof isMobile === 'boolean' && isMobile}
          expanded={expandSideBar}
          onExpand={handleOnExpand}
          variation={variation}
        />
      )}
      <div className={styles.rightSide}>
        <TopBar
          title={title || ''}
          initials={initials}
          mobile={typeof isMobile === 'boolean' && isMobile}
          onExpand={handleOnExpand}
        />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default BaseLayout;
