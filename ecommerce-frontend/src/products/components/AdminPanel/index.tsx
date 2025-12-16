import { Box, Button } from '@mui/material';
import NewProductDialog from './NewProductDialog/NewProductDialog';
import { useState } from 'react';
import type { NewProduct } from '../../productTypes';
import { NewProductContext } from '../../context/productContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewProduct } from '../../services/productServices';

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
  const inicialProductValue = {
    sku: '',
    name: '',
    shortDescription: '',
    price: 0,
    vatType: 0,
  };
  const [newProduct, setNewProduct] = useState<NewProduct>(inicialProductValue);

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const {
    mutateAsync: newProductMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: addNewProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNewProduct(inicialProductValue);
    setOpen(false);
  };

  const handleNewProductAccept = async () => {
    try {
      await newProductMutation(newProduct);
      setNewProduct(inicialProductValue)
      setOpen(false);
      console.log('New product accepted', newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  if (isPending) console.log('...Adding new product');

  if (isError) console.log({ Error: error.message });

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
