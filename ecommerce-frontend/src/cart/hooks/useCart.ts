import { createContext, useContext } from 'react';
import type { Cart } from '../types';

interface CartContextValue {
    cart: Cart;
}

export const CartContext = createContext<CartContextValue | null>(null);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
