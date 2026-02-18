import {  type ReactNode } from 'react';
import type { Cart, CartItem } from '../types';
import { CartContext } from '../hooks/useCart';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../../auth/hooks/useAuthContext';
import { fetchCart } from '../services/cartServices';

const CART_STORAGE_KEY = 'guest_cart';

const getGuestCart = (): CartItem[] => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};
const cartParse = (items: CartItem[]): Cart => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    return { items, totalItems, totalPrice };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { user, isAuthenticated } = useAuthContext();

    const { data } = useQuery({
        queryKey: ['cart', user?.id],
        queryFn: fetchCart,
        enabled: isAuthenticated,
    });

    const cart: Cart = data ? cartParse(data.items) : cartParse(getGuestCart());

    return (
        <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
    );
};
