import { useState } from 'react';
import { useNewProduct } from './useNewProduct';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewProduct } from '../services/productServices';

export const useNewProductDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { newProduct, setNewProduct, resetNewProduct, updateField } =
    useNewProduct();

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

  const isOpenDialog = () => setIsOpen(true);

  const closeDialog = () => {
    resetNewProduct();
    setIsOpen(false);
  };

  const handleAccept = async () => {
    try {
      await addProductMutation(newProduct);
      resetNewProduct();
      setIsOpen(false);
      console.log('New product accepted', newProduct);
    } catch (err) {
      console.error(err);
    }
  };

  if (isPending) console.log('...Adding new product');
  if (isError) console.log({ Error: (error as Error).message });

  return {
    isOpen,
    isOpenDialog,
    closeDialog,
    handleAccept,
    newProduct,
    setNewProduct,
    resetNewProduct,
    updateField,
  };
};
