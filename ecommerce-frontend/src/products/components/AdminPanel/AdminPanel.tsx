import { Box, Button } from '@mui/material';
import NewProductDialog from './NewProductDialog/NewProductDialog';
import { useState } from 'react';
import { NewProductContext } from '../../context/productContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewProduct } from '../../services/productServices';
import { useNewProduct } from '../../hooks/useNewProduct';

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
  const { newProduct, setNewProduct, resetNewProduct, updateField } =
    useNewProduct();

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const {
    mutateAsync: addProductMutation,
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
    resetNewProduct();
    setOpen(false);
  };

  const handleNewProductAccept = async () => {
    try {
      await addProductMutation(newProduct);
      resetNewProduct();
      setOpen(false);
      console.log('New product accepted', newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  if (isPending) console.log('...Adding new product');

  if (isError) console.log({ Error: error.message });

  return (
    <NewProductContext.Provider
      value={{ newProduct, setNewProduct, resetNewProduct, updateField }}
    >
      <Box sx={styleAdminPanel}>
        BIENVENIDO (ADMIN)
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
