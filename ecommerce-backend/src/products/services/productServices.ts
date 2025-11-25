import { products } from '../../data/data';
import { NewProduct, Product } from '../../types';

const productId = (): string => {
  return `prod-` + (products.length + 1).toString().padStart(4, '0');
};

const getProducts = (): Product[] => {
  return products;
};

const addProduct = (product: NewProduct): Product => {
  const id = productId();
  const newProduct = { id, ...product };
  products.push(newProduct);
  return newProduct;
};

export default { getProducts, addProduct };
