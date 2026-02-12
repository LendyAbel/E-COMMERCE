import { useState, type ReactNode } from 'react';
import { useNewProduct } from '../hooks/useNewProduct';
import { NewProductDialogContext } from '../hooks/useNewProductDialog';

export const NewProductDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resetNewProduct } = useNewProduct();

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    resetNewProduct();
    setIsOpen(false);
  };

  return (
    <NewProductDialogContext.Provider value={{ isOpen, open, close }}>
      {children}
    </NewProductDialogContext.Provider>
  );
};
