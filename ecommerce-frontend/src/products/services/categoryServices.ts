import axios, { type AxiosResponse } from 'axios';
import type { ProductCategory } from '../productTypes';

const API_URL = '/api/categories';

export const fetchAllCategories = async (): Promise<ProductCategory[]> => {
  try {
    const res: AxiosResponse<ProductCategory[]> = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.log('Error fetching categories: ', error);
    throw error;
  }
};
