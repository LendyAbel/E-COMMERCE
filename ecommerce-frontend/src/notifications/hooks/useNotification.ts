import { createContext, useContext } from 'react';

export type NotificationsTypes = 'success' | 'info' | 'error';

interface NotificationContextValue {
  message: string;
  type: NotificationsTypes;
  isOpen: boolean;
  resetNotification: () => void;
  setNotification: (message: string, type?: NotificationsTypes) => void;
}

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotificationContext must be used within NotificationProvider',
    );
  }
  return context;
};
