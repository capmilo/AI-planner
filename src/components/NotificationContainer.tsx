import React from 'react';
import { useNotification } from '../context/NotificationContext';
import Notification from './Notification';

const NotificationContainer: React.FC = () => {
  const { notifications, hideNotification } = useNotification();

  return (
    <>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          isVisible={true}
          onClose={() => hideNotification(notification.id)}
          duration={notification.duration}
        />
      ))}
    </>
  );
};

export default NotificationContainer;
