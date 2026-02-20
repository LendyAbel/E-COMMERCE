import { createContext, useContext } from 'react';
import type { Cart, CartItem, NewCartItem } from '../types';

interface CartContextValue {
    cart: Cart;
    addItem: (item: NewCartItem) => Promise<void>;
    deleteItem: (item: CartItem) => Promise<void>
}

export const CartContext = createContext<CartContextValue | null>(null);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
