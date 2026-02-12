import { useCallback, useRef, useState, type ReactNode } from 'react';
import {
  NotificationContext,
  type NotificationsTypes,
} from '../hooks/useNotification';

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationsTypes>('info');
  const [isOpen, setIsOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetNotification = useCallback(() => {
    setMessage('');
    setType('info');
    setIsOpen(false);
  }, []);

  const setNotification = useCallback(
    (message: string, type?: NotificationsTypes) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setMessage(message);
      setType(type || 'info');
      setIsOpen(true);

      timeoutRef.current = setTimeout(() => {
        resetNotification();
      }, 3000);
    },
    [resetNotification],
  );

  return (
    <NotificationContext.Provider
      value={{ message, type, isOpen, resetNotification, setNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
