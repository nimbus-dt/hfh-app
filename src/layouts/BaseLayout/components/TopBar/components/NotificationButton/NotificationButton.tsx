import React from 'react';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import IconButton from 'components/IconButton';

const NotificationButton = () => (
  <IconButton variation="not-outlined">
    <MdOutlineNotificationsNone />
  </IconButton>
);

export default NotificationButton;
