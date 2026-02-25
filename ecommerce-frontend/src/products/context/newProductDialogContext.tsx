import { useState, type ReactNode } from 'react';
import { NewProductDialogContext } from '../hooks/useNewProductDialog';

export const NewProductDialogProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
    };

    return (
        <NewProductDialogContext.Provider value={{ isOpen, open, close }}>
            {children}
        </NewProductDialogContext.Provider>
    );
};
