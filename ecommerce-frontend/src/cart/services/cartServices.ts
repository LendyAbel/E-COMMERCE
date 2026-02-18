import type { AxiosResponse } from 'axios';
import type { ServerCart } from '../types';
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
