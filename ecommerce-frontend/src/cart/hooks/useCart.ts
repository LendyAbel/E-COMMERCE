import { createContext, useContext } from 'react';
import type { Cart, NewCartItem } from '../types';

interface CartContextValue {
    cart: Cart;
    addItem: (item: NewCartItem) => Promise<void>;
    deleteItem: (itemId: string, variantId?: string) => Promise<void>;
    updateQtyItem: (
        itemId: string,
        quantity: number,
        variantId?: string,
    ) => Promise<void>;
}

export const CartContext = createContext<CartContextValue | null>(null);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
