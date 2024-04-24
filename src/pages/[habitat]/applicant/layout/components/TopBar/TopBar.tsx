import React from 'react';
import { Flex } from '@aws-amplify/ui-react';
import style from './TopBar.module.css';
import NotificationButton from './components/NotificationButton';
import ProfileBadge from './components/ProfileBadge';

interface IProperties {
  title: string;
  initials: string;
}

const TopBar = ({ title, initials }: IProperties) => (
  <Flex
    className={`${style.topBar}`}
    justifyContent="space-between"
    alignItems="center"
  >
    <Flex className={`${style.title}`}>{title}</Flex>
    <Flex gap="12px">
      <NotificationButton />
      <ProfileBadge initials={initials} />
    </Flex>
  </Flex>
);

export default TopBar;
