import axios, { type AxiosPromise } from 'axios';
import type { Product } from '../productTypes';

const API_URL = '/api/products';

export const fetchAllProducts = async (): AxiosPromise<Product[]> => {
  return axios.get<Product[]>(`${API_URL}`);
};
