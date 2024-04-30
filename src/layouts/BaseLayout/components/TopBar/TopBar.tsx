import React from 'react';
import { Button, Flex } from '@aws-amplify/ui-react';
import { MdOutlineMenu } from 'react-icons/md';
import style from './TopBar.module.css';
import NotificationButton from './components/NotificationButton';
import ProfileBadge from './components/ProfileBadge';

interface IProperties {
  title: string;
  initials: string;
  mobile: boolean;
  onExpand: () => void;
}

const TopBar = ({ title, initials, mobile, onExpand }: IProperties) => (
  <Flex
    className={`${style.topBar}`}
    justifyContent="space-between"
    alignItems="center"
  >
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
      <ProfileBadge initials={initials} />
    </Flex>
  </Flex>
);

export default TopBar;
