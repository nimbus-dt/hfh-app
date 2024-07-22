import { useTranslation } from 'react-i18next';

import { signOut } from 'aws-amplify/auth';
import { Button, Menu, MenuItem } from '@aws-amplify/ui-react';
import style from './ProfileBadge.module.css';

interface IProperties {
  initials?: string;
}

const ProfileBadge = ({ initials }: IProperties) => {
  const { t } = useTranslation();
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
      <MenuItem onClick={onLogOut}>
        {t(
          'layouts.baseLayout.components.topBar.components.profileBadge.logOut'
        )}
      </MenuItem>
    </Menu>
  );
};

export default ProfileBadge;
