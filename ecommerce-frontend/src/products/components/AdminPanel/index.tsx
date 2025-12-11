import { Box, Button } from '@mui/material';
import NewProductDialog from './NewProductDialog/NewProductDialog';
import { useState } from 'react';

const styleAdminPanel = {
  height: 50,
  margin: 0.5,
  padding: 1,
  backgroundColor: 'blue',
  color: 'white',
  borderRadius: 2,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const AdminPanel = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleNewProductAccept = () => {
    console.log('New product accepted');
    setOpen(false);
  };

  return (
    <Box sx={styleAdminPanel}>
      Admin Panel
      <Button variant='contained' onClick={handleOpen}>
        Add New Product
      </Button>
      <NewProductDialog
        open={open}
        onClose={handleClose}
        onAccept={handleNewProductAccept}
      />
    </Box>
  );
};

export default AdminPanel;
