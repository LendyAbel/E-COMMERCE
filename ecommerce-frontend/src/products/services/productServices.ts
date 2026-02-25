import axios, { type AxiosResponse } from 'axios';
import type { NewProduct, Product } from '../productTypes';
import axiosInstance from '../../lib/axiosInstance';

const API_URL = '/api/products';

export const fetchAllProducts = async (): Promise<Product[]> => {
    try {
        const res: AxiosResponse<Product[]> = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        console.log('Error fetching products: ', error);
        throw error;
    }
};

export const addNewProduct = async (
    newProduct: NewProduct,
): Promise<Product> => {
  console.log(newProduct);
    try {
        const res: AxiosResponse<Product> = await axiosInstance.post(
            API_URL,
            newProduct,
        );
        return res.data;
    } catch (error: unknown) {
        let errorMessage = '';
        if (axios.isAxiosError(error)) {
            const responseData = error.response?.data.error;
            errorMessage += responseData;
        }
        console.error('Error adding product:', errorMessage);
        throw error;
    }
};
