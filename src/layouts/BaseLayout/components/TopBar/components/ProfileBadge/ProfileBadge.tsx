import { Auth } from 'aws-amplify';
import { Button, Menu, MenuItem } from '@aws-amplify/ui-react';

import style from './ProfileBadge.module.css';

interface IProperties {
  initials?: string;
}

const ProfileBadge = ({ initials }: IProperties) => {
  const onLogOut = () => {
    Auth.signOut();
  };

  return (
    <Menu
      trigger={
        <Button className={`${style.profileBadge}`}>{initials || ''}</Button>
      }
    >
      <MenuItem onClick={onLogOut}>Log out</MenuItem>
    </Menu>
  );
};

export default ProfileBadge;
