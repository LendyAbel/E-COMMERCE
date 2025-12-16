import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '../../services/productServices';

import ProductCard from './ProductCard';
import type { Product } from '../../productTypes';
import { Alert, Box, Skeleton } from '@mui/material';

const ProductsContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
    retry: 3,
  });
  const products = data ?? [];

  if (isLoading) {
    // Poner toda la lógica de loading
    return (
      <div>
        <Skeleton animation='wave' />
        <Skeleton animation='wave' />
        <Skeleton animation='wave' />
      </div>
    );
  }

  if (isError) {
    // Poner toda la lógica de error
    return (
      <div>
        <Alert severity='error'>Error loading products</Alert>
      </div>
    );
  }

  return (
    <Box component={'section'} display={'grid'} gap={2}>
      {products.map((product: Product) => {
        return (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        );
      })}
    </Box>
  );
};

export default ProductsContainer;
