import { createContext } from 'react';
import type { NewProduct } from '../productTypes';

export interface NewProductContextValue {
  newProduct: NewProduct;
  setNewProduct: React.Dispatch<React.SetStateAction<NewProduct>>;
  resetNewProduct: () => void;
  updateField: <K extends keyof NewProduct>(
    key: K,
    value: NewProduct[K]
  ) => void;
}

export const NewProductContext = createContext<NewProductContextValue | null>(
  null
);
