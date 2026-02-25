// ProductsContainer.tsx
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '../../services/productServices';
import { useAuthContext } from '../../../auth/hooks/useAuthContext';

import type { Product } from '../../productTypes';

import { Alert, Box, Skeleton } from '@mui/material';

import NewProductDialog from '../NewProductDialog/NewProductDialog';
import ProductCard from './ProductCard/ProductCard';
import { NewProductDialogProvider } from '../../context/newProductDialogContext';
import AddProductButton from './AddProductButton/AddProductButton';

const ProductsContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
    retry: 3,
  });
  const products = data ?? [];

  const { user } = useAuthContext();

  if (isLoading) {
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
    console.error('Error loading products');
    return (
      <div>
        <Alert severity='error'>Error loading products</Alert>
      </div>
    );
  }

  return (
      <NewProductDialogProvider>
        <div style={{ position: 'relative' }}>
          {user?.role === 'admin' && <AddProductButton />}

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
          <NewProductDialog />
        </div>
      </NewProductDialogProvider>
  );
};

export default ProductsContainer;
