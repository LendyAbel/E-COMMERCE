import { useState, type ReactNode } from 'react';
import type { Cart, CartItem, NewCartItem } from '../types';
import { CartContext } from '../hooks/useCart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../../auth/hooks/useAuthContext';
import { addItemToCart, fetchCart } from '../services/cartServices';

const CART_STORAGE_KEY = 'guest_cart';

const getGuestCart = (): CartItem[] => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

const saveGuestCart = (items: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
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
    const queryClient = useQueryClient();
    const { user, isAuthenticated } = useAuthContext();
    const [guestCart, setGuestCart] = useState<CartItem[]>(getGuestCart);

    const { data } = useQuery({
        queryKey: ['cart', user?.id],
        queryFn: fetchCart,
        enabled: isAuthenticated,
    });

    const cart: Cart = isAuthenticated
        ? data
            ? cartParse(data.items)
            : cartParse([])
        : cartParse(getGuestCart());

    const mutate = useMutation({
        mutationFn: addItemToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
        },
    });

    const addItem = async (item: NewCartItem) => {
        if (isAuthenticated) {
            await mutate.mutateAsync(item);
        } else {
            const existingItem = guestCart.find(
                i =>
                    i.productId === item.productId &&
                    i.variantId === item.variantId,
            );
            const updatedCart = existingItem
                ? guestCart.map(i =>
                      i.productId === item.productId &&
                      i.variantId === item.variantId
                          ? { ...i, quantity: i.quantity + item.quantity }
                          : i,
                  )
                : [...guestCart, { ...item, price: 0 }];
            setGuestCart(updatedCart);
            saveGuestCart(updatedCart);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addItem }}>
            {children}
        </CartContext.Provider>
    );
};
