import type { AxiosResponse } from 'axios';
import type { NewCartItem, ServerCart } from '../types';
import axiosInstance from '../../lib/axiosInstance';

const API_URL = '/api/cart';

export const fetchCart = async (): Promise<ServerCart> => {
    const res: AxiosResponse<ServerCart> = await axiosInstance.get(API_URL);
    return res.data;
};

export const addItemToCart = async (item: NewCartItem): Promise<ServerCart> => {
    const res: AxiosResponse<ServerCart> = await axiosInstance.post(
        `${API_URL}/items`,
        item,
    );
    return res.data;
};

export const deleteItemFromCart = async (
    itemId: string,
    variantId?: string,
): Promise<ServerCart> => {
    const res: AxiosResponse<ServerCart> = await axiosInstance.delete(
        `${API_URL}/items/${itemId}`,
        {
            params: variantId ? { variantId } : undefined,
        },
    );
    return res.data;
};

export const updateQtyItemInCart = async (
    itemId: string,
    quantity: number,
    variantId?: string,
): Promise<ServerCart> => {
    const res: AxiosResponse<ServerCart> = await axiosInstance.put(
        `${API_URL}/items/${itemId}`,
        { quantity },
        {
            params: variantId ? { variantId } : undefined,
        },
    );
    return res.data;
};
