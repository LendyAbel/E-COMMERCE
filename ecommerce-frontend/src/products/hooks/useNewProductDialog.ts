import { createContext, useContext } from 'react';

type NewProductDialogContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const NewProductDialogContext =
  createContext<NewProductDialogContextValue | null>(null);

export const useNewProductDialog = () => {
  const context = useContext(NewProductDialogContext);
  if (!context) {
    throw new Error(
      'useNewProductDialog must be used within NewProductDialogProvider',
    );
  }
  return context;
};
