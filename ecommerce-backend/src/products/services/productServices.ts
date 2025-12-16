import { products } from '../../data/data';
import { NewProduct, Product } from '../../types';

import { v4 as uuid } from 'uuid';

const getProducts = (): Product[] => {
  return products;
};

const addProduct = (product: NewProduct): Product => {
  const id = uuid();
  const newProduct = { id, ...product };

  if (newProduct.stock === undefined) {
    newProduct.stock = 0;
    newProduct.inStock = false;
  }

  if (newProduct.stock && newProduct.stock > 0) {
    newProduct.inStock = true;
  } else {
    newProduct.inStock = false;
  }

  products.unshift(newProduct);
  return newProduct;
};

export default { getProducts, addProduct };
