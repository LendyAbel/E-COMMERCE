import type { AxiosResponse } from 'axios';
import type { NewCartItem, ServerCart } from '../types';
import axios from 'axios';

const API_URL = '/api/cart';

const getToken = () => localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);

export const fetchCart = async (): Promise<ServerCart> => {
    const token = getToken();
    const res: AxiosResponse<ServerCart> = await axios.get(API_URL, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
};

export const addItemToCart = async (item: NewCartItem): Promise<ServerCart> => {
    const token = getToken();
    const res: AxiosResponse<ServerCart> = await axios.post(
        `${API_URL}/items`,
        item,
        {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
    );
    return res.data;
};

export const deleteItemFromCart = async (
    itemId: string,
    variantId?: string,
): Promise<ServerCart> => {
    const token = getToken();
    const res: AxiosResponse<ServerCart> = await axios.delete(
        `${API_URL}/items/${itemId}`,
        {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            params: variantId ? { variantId } : undefined,
        },
    );
    return res.data;
};
