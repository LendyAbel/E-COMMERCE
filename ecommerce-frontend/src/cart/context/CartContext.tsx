import { useState, type ReactNode } from 'react';
import type { Cart, CartItem, NewCartItem } from '../types';
import { CartContext } from '../hooks/useCart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../../auth/hooks/useAuthContext';
import {
    addItemToCart,
    deleteItemFromCart,
    fetchCart,
    updateQtyItemInCart,
} from '../services/cartServices';
import { fetchAllProducts } from '../../products/services/productServices';
import type { Product } from '../../products/productTypes';

const CART_STORAGE_KEY = 'guest_cart';

//AUX FUNCTIONS

const getGuestCart = (): CartItem[] => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};
const saveGuestCart = (items: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};
const cartParse = (items: CartItem[]): Cart => {
    const totalItems = items.reduce((acc, item) => {
        const qty = Number(item.quantity) || 0;
        return acc + qty;
    }, 0);
    const totalPrice = items.reduce((acc, item) => {
        const price = Number(item.price) || 0;
        const qty = Number(item.quantity) || 0;
        return acc + price * qty;
    }, 0);
    return { items, totalItems, totalPrice };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
    const { user, isAuthenticated } = useAuthContext();
    const [guestCart, setGuestCart] = useState<CartItem[]>(getGuestCart);


    //GET PRODUCT DETAIL
    //fetch products
    const { data: productData } = useQuery({
        queryKey: ['products'],
        queryFn: fetchAllProducts,
        retry: 3,
    });
    const products = productData ?? [];
    //function to get product detail
    const getProductDetail = (productId: string): Product | undefined => {
        return products.find(p => p.id === productId);
    };

    //FETCH CART
    const { data: CartData } = useQuery({
        queryKey: ['cart', user?.id],
        queryFn: fetchCart,
        enabled: isAuthenticated,
    });
    const cart: Cart = isAuthenticated
        ? CartData
            ? cartParse(CartData.items)
            : cartParse([])
        : cartParse(guestCart);

    //ADD ITEM TO CART
    const addMutate = useMutation({
        mutationFn: addItemToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
        },
    });
    const addItem = async (item: NewCartItem) => {
        if (isAuthenticated) {
            await addMutate.mutateAsync(item);
        } else {
            const existingItem = guestCart.find(
                i =>
                    i.productId === item.productId &&
                    i.variantId === item.variantId,
            );
            const product = getProductDetail(item.productId);

            const updatedCart = existingItem
                ? guestCart.map(i =>
                      i.productId === item.productId &&
                      i.variantId === item.variantId
                          ? { ...i, quantity: i.quantity + item.quantity }
                          : i,
                  )
                : [
                      ...guestCart,
                      { ...item, price: Number(product?.price) || 0 },
                  ];
            setGuestCart(updatedCart);
            saveGuestCart(updatedCart);
        }
    };

    //DELETE ITEM
    const deleteMutate = useMutation({
        mutationFn: ({
            itemId,
            variantId,
        }: {
            itemId: string;
            variantId?: string;
        }) => deleteItemFromCart(itemId, variantId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
        },
    });
    const deleteItem = async (itemId: string, variantId?: string) => {
        if (isAuthenticated) {
            await deleteMutate.mutateAsync({ itemId, variantId });
        } else {
            const updatedCart = guestCart.filter(
                i => i.productId !== itemId && i.variantId !== variantId,
            );
            setGuestCart(updatedCart);
            saveGuestCart(updatedCart);
        }
    };

    // UPDATE ITEM
    const updateMutate = useMutation({
        mutationFn: ({
            itemId,
            quantity,
            variantId,
        }: {
            itemId: string;
            quantity: number;
            variantId?: string;
        }) => updateQtyItemInCart(itemId, quantity, variantId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
        },
    });

    const updateQtyItem = async (
        itemId: string,
        quantity: number,
        variantId?: string,
    ) => {
        if (isAuthenticated) {
            await updateMutate.mutateAsync({ itemId, quantity, variantId });
        } else {
            const updatedCart = guestCart.map(i =>
                i.productId === itemId && i.variantId === variantId
                    ? { ...i, quantity }
                    : i,
            );
            setGuestCart(updatedCart);
            saveGuestCart(updatedCart);
        }
    };

    return (
        <CartContext.Provider
            value={{ cart, addItem, deleteItem, updateQtyItem }}
        >
            {children}
        </CartContext.Provider>
    );
};
