import { Button } from '@aws-amplify/ui-react';
import React from 'react';
import style from './ProfileBadge.module.css';

interface IProperties {
  initials: string;
}

const ProfileBadge = ({ initials }: IProperties) => (
  <Button className={`${style.profileBadge}`}>{initials}</Button>
);

export default ProfileBadge;
