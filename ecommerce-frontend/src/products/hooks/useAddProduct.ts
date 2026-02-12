import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewProduct } from '../services/productServices';

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addNewProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};
