import { useState } from 'react';

import { Auth } from 'aws-amplify';
import { Button } from '@aws-amplify/ui-react';

import style from './ProfileBadge.module.css';

interface IProperties {
  initials?: string;
}

const ProfileBadge = ({ initials }: IProperties) => {
  const [openProfile, setOpenProfile] = useState(false);

  const onLogOut = () => {
    Auth.signOut();
  };

  return (
    <div className={style.relative}>
      <Button
        className={`${style.profileBadge}`}
        onClick={() => setOpenProfile((prev) => !prev)}
      >
        {initials || ''}
      </Button>
      {openProfile && (
        <div className={style.menu}>
          <button
            onClick={onLogOut}
            tabIndex={0}
            type="button"
            className={style.menuItem}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                onLogOut();
              }
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileBadge;
