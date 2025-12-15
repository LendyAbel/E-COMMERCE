import { Box, Button } from '@mui/material';
import NewProductDialog from './NewProductDialog/NewProductDialog';
import { useState } from 'react';
import type { NewProduct } from '../../productTypes';
import { NewProductContext } from '../../context/productContext';

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
  const [newProduct, setNewProduct] = useState<NewProduct>({
    sku: '',
    name: '',
    shortDescription: '',
    price: 0,
    vatType: 0,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewProductAccept = () => {
    console.log('New product accepted', newProduct);
    setOpen(false);
  };

  return (
    <NewProductContext.Provider value={{ newProduct, setNewProduct }}>
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
    </NewProductContext.Provider>
  );
};

export default AdminPanel;
