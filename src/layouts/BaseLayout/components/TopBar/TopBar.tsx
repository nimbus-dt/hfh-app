import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdOutlineMenu } from 'react-icons/md';
import { type RecursiveModelPredicate } from 'aws-amplify/datastore';

import { Button, Flex, useAuthenticator } from '@aws-amplify/ui-react';

import { useUserQuery } from 'hooks/services';
import { type LazyUser } from 'models';
import getRoutes, { getTitle } from 'utils/routes';

import NotificationButton from './components/NotificationButton';
import ProfileBadge from './components/ProfileBadge';
import Translate from './components/Translate';
import style from './TopBar.module.css';
import TopBarProps from './TopBarProps.types';

const TopBar = ({ mobile, onExpand }: TopBarProps) => {
  const { t } = useTranslation();

  const location = useLocation();
  const routes = getRoutes(t);
  const title = getTitle(location.pathname, routes);

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

  let initials = '';

  if (userData) {
    const tempUser = userData[0];
    const firstNameInit = tempUser?.firstName.charAt(0);
    const lastNameInit = tempUser?.lastName.charAt(0);
    initials = firstNameInit + lastNameInit;
  }

  return (
    <div className={`${style.topBar}`}>
      <Flex alignItems="center">
        {mobile && (
          <Button variation="menu" padding="12px" onClick={onExpand}>
            <MdOutlineMenu size="24px" />
          </Button>
        )}
        <Flex className={`${style.title}`}>{title}</Flex>
      </Flex>
      <Flex gap="12px">
        <NotificationButton />
        <Translate />
        <ProfileBadge initials={initials} />
      </Flex>
    </div>
  );
};

export default TopBar;
