import { Alert, Snackbar } from '@mui/material';
import { useNotificationContext } from './hooks/useNotification';

const Notification = () => {
  const { message, type, isOpen, resetNotification } = useNotificationContext();
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={resetNotification}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={type} onClose={resetNotification} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
