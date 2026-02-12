import { useCallback, useState, type ReactNode } from 'react';
import type { NewProduct } from '../productTypes';
import { NewProductContext } from '../hooks/useNewProduct';

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

export const NewProductProvider = ({ children }: { children: ReactNode }) => {
  const [newProduct, setNewProduct] = useState<NewProduct>(
    createEmptyNewProduct(),
  );

  const resetNewProduct = useCallback(() => {
    setNewProduct(createEmptyNewProduct());
  }, []);

  const updateField = useCallback(
    <K extends keyof NewProduct>(key: K, value: NewProduct[K]) => {
      setNewProduct(prev => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <NewProductContext.Provider
      value={{ newProduct, setNewProduct, resetNewProduct, updateField }}
    >
      {children}
    </NewProductContext.Provider>
  );
};
