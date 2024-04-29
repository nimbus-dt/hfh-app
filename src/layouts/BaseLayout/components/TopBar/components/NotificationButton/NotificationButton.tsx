import { Button } from '@aws-amplify/ui-react';
import React from 'react';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import style from './NotificationButton.module.css';

const NotificationButton = () => (
  <Button className={`${style.notificationButton}`} variation="link">
    <MdOutlineNotificationsNone />
  </Button>
);

export default NotificationButton;
