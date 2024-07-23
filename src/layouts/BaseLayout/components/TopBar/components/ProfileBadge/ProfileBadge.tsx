import { signOut } from 'aws-amplify/auth';
import { Button, Menu, MenuItem } from '@aws-amplify/ui-react';
import style from './ProfileBadge.module.css';

interface IProperties {
  initials?: string;
}

const ProfileBadge = ({ initials }: IProperties) => {
  const onLogOut = () => {
    signOut();
  };

  return (
    <Menu
      trigger={
        <Button className={`${style.profileBadge}`}>{initials || ''}</Button>
      }
      className={style.menu}
      menuAlign="end"
    >
      <MenuItem onClick={onLogOut}>Log out</MenuItem>
    </Menu>
  );
};

export default ProfileBadge;
