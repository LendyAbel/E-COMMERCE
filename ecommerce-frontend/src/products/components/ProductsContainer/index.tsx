import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '../../services/productServices';

import ProductCard from './ProductCard';
import type { Product } from '../../productTypes';

const ProductsContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchAllProducts(),
    retry: 3,
  });
  const products = data?.data || [];
  console.log(products);

  if (isLoading) {
    // Poner toda la lógica de loading
    return <div>Loading...</div>;
  }

  if (isError) {
    // Poner toda la lógica de error
    return <div>Error loading products.</div>;
  }

  return (
    <div>
      {products.map((product: Product) => {
        return (
          <div>
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsContainer;
