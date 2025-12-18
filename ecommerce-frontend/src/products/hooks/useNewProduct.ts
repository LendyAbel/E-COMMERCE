import { useCallback, useState } from 'react';
import type { NewProduct } from '../productTypes';

const createEmptyNewProduct = (): NewProduct => ({
  sku: '',
  name: '',
  shortDescription: '',
  price: 0,
  vatType: 0,
  slug: undefined,
  longDescription: undefined,
  brand: undefined,
  mainCategory: undefined,
  otherCategory: undefined,
  stock: undefined,
  status: undefined,
  images: undefined,
  variants: undefined,
  attributes: undefined,
  inStock: undefined,
});

export const useNewProduct = () => {
  const [newProduct, setNewProduct] = useState<NewProduct>(createEmptyNewProduct());

  const resetNewProduct = useCallback(() => {
    setNewProduct(createEmptyNewProduct());
  }, []);

  const updateField = useCallback(
    <K extends keyof NewProduct>(key: K, value: NewProduct[K]) => {
      setNewProduct(prev => ({ ...prev, [key]: value }));
    },
    []
  );

  return { newProduct, setNewProduct, resetNewProduct, updateField };
};
