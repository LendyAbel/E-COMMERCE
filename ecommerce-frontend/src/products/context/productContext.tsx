import { createContext } from 'react';
import type { NewProduct } from '../productTypes';

export interface NewProductContextValue {
  newProduct: NewProduct;
  setNewProduct: React.Dispatch<React.SetStateAction<NewProduct>>;
}

export const NewProductContext = createContext<NewProductContextValue | null>(
  null
);
