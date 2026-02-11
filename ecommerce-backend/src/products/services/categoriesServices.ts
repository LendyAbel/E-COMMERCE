import { categories } from '../../data/products-list';
import { ProductCategory } from '../types';

const getCategories = (): ProductCategory[] => {
    console.log(categories);
  return categories;
};

export default { getCategories };
