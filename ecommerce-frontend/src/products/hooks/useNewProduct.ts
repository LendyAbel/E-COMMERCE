import { createContext, useContext } from 'react';
import type { NewProduct } from '../productTypes';

interface NewProductContextValue {
  newProduct: NewProduct;
  setNewProduct: React.Dispatch<React.SetStateAction<NewProduct>>;
  resetNewProduct: () => void;
  updateField: <K extends keyof NewProduct>(
    key: K,
    value: NewProduct[K],
  ) => void;
}

export const NewProductContext = createContext<NewProductContextValue | null>(
  null,
);

export const useNewProductContext = () => {
  const context = useContext(NewProductContext);
  if (!context) {
    throw new Error(
      'useNewProductDialogContext must be used within NewProductDialogProvider',
    );
  }
  return context;
};
