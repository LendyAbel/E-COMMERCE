import { categories } from '../../data/products-list';
import { ProductCategory } from '../ProductTypes';

const getCategories = (): ProductCategory[] => {
    console.log(categories);
    return categories;
};

export default { getCategories };
