import { categories } from '../../data/products-list';
import { ProductCategory } from '../ProductTypes';

const getCategories = (): ProductCategory[] => {
    return categories;
};

export default { getCategories };
