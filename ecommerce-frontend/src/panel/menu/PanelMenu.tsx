import { Menu } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from '../../auth/hooks/useAuthContext';
import { NavLink } from 'react-router';
import { useNotificationContext } from '../../notifications/hooks/useNotification';

const PanelMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setNotification } = useNotificationContext();

  const { user, isAuthenticated, logout } = useAuthContext();

  const handleMenuToglle = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    logout();
    setNotification("You've logout. See you soon");
  };

  return (
    <div className='navbar-menu' onClick={handleMenuToglle}>
      <Button>
        <Menu />
      </Button>
      {isOpen && (
        <div className='panel-menu'>
          {isAuthenticated ? (
            <>
              <Typography color={'primary'} sx={{ p: 1 }}>
                {user?.email}
              </Typography>
              <Button>account</Button>
              <Button>orders</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button component={NavLink} to='/login'>
                Login
              </Button>
              <Button component={NavLink} to='/register'>
                Register
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PanelMenu;
