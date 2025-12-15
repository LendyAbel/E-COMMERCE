import axios, { type AxiosPromise } from 'axios';
import type { NewProduct, Product } from '../productTypes';

const API_URL = '/api/products';

export const fetchAllProducts = async (): AxiosPromise<Product[]> => {
  return axios.get<Product[]>(API_URL);
};

export const addNewProduct = async (
  newProduct: NewProduct
): AxiosPromise<Product> => {
  try {
    return axios.post<Product>(API_URL, newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};
