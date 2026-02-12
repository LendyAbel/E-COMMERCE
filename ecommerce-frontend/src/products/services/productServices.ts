import axios, { type AxiosResponse } from 'axios';
import type { NewProduct, Product } from '../productTypes';

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
  try {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
    const res: AxiosResponse<Product> = await axios.post(API_URL, newProduct, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });
    return res.data;
  } catch (error: unknown) {
    let errorMessage = '';
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data.error;
      console.log(responseData);
      errorMessage += responseData;
    }
    console.error('Error adding product:', errorMessage);
    throw error;
  }
};
