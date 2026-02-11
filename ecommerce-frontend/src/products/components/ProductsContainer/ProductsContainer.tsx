import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '../../services/productServices';
import { NewProductContext } from '../../context/newProductContext';
import { useNewProductDialog } from '../../hooks/useNewProductDialog';
import { useAuthContext } from '../../../auth/hooks/useAuthContext';

import type { Product } from '../../productTypes';

import { Alert, Box, Fab, Skeleton } from '@mui/material';
import { Add } from '@mui/icons-material';

import NewProductDialog from '../NewProductDialog/NewProductDialog';
import ProductCard from './ProductCard/ProductCard';

const ProductsContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
    retry: 3,
  });
  const products = data ?? [];

  const {
    isOpen,
    isOpenDialog,
    closeDialog,
    handleAccept,
    newProduct,
    setNewProduct,
    resetNewProduct,
    updateField,
  } = useNewProductDialog();

  // const user = JSON.parse(
  //   localStorage.getItem(import.meta.env.VITE_USER_KEY) || 'null',
  // );
  const { user } = useAuthContext();

  if (isLoading) {
    // Poner toda la lógica de loading
    return (
      <div style={{ width: '80%', margin: 'auto' }}>
        <Skeleton animation='pulse' height={50} />
        <Skeleton animation='pulse' height={50} />
        <Skeleton animation='pulse' height={50} />
        <Skeleton animation='pulse' height={50} />
        <Skeleton animation='pulse' height={50} />
        <Skeleton animation='pulse' height={50} />
      </div>
    );
  }

  if (isError) {
    // Poner toda la lógica de error
    console.error('Error loading products');
    return (
      <div>
        <Alert severity='error'>Error loading products</Alert>
      </div>
    );
  }

  return (
    <NewProductContext.Provider
      value={{ newProduct, setNewProduct, resetNewProduct, updateField }}
    >
      <div style={{ position: 'relative' }}>
        {user?.role === 'admin' && (
          <Fab
            sx={{ position: 'absolute' }}
            className='add-product-button'
            color='primary'
            aria-label='add'
            onClick={isOpenDialog}
          >
            <Add /> NEW
          </Fab>
        )}

        <Box
          component={'section'}
          display={'grid'}
          gap={2}
          style={{ width: '80%', margin: 'auto' }}
        >
          {products.map((product: Product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </Box>
        <NewProductDialog
          open={isOpen}
          onClose={closeDialog}
          onAccept={handleAccept}
        />
      </div>
    </NewProductContext.Provider>
  );
};

export default ProductsContainer;
