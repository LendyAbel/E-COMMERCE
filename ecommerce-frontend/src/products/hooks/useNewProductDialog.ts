import { createContext, useContext } from 'react';

type NewProductDialogContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const NewProductDialogContext =
  createContext<NewProductDialogContextValue | null>(null);

export const useNewProductDialogContext = () => {
  const context = useContext(NewProductDialogContext);
  if (!context) {
    throw new Error(
      'useNewProductDialogContext must be used within NewProductDialogProvider',
    );
  }
  return context;
};
