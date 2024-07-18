import { Button, Flex } from '@aws-amplify/ui-react';
import { MdOutlineMenu } from 'react-icons/md';

import NotificationButton from './components/NotificationButton';
import ProfileBadge from './components/ProfileBadge';
import Translate from './components/Translate';

import style from './TopBar.module.css';

interface IProperties {
  title: string;
  initials: string;
  mobile: boolean;
  onExpand: () => void;
}

const TopBar = ({ title, initials, mobile, onExpand }: IProperties) => (
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

export default TopBar;
