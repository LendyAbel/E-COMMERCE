import { products } from '../../data/data';
import { NewProduct, Product } from '../../types';

import { v4 as uuid } from 'uuid';

// Aux Function to check stock
const parseStock = (product: Product): Product => {
  const stock = product.stock ?? 0;
  return { ...product, stock, inStock: stock > 0 };
};

const getProducts = (): Product[] => {
  return products;
};

const getProductById = (id: Product['id']): Product => {
  const product = products.find(p => p.id === id);
  if (!product) throw new Error(`Product with id: ${id} not found`);
  return product;
};

const addProduct = (product: NewProduct): Product => {
  const id = uuid();
  const productWithId = { id, ...product };
  const productWithStock = parseStock(productWithId);

  const newProduct = { ...productWithStock };

  products.unshift(newProduct);
  return newProduct;
};

const updateProduct = (id: string, productData: NewProduct): Product => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) throw new Error(`Product with id: ${id} not found`);

  const mergedProduct: Product = { ...products[index], ...productData, id };
  const updatedProduct = parseStock(mergedProduct);

  products[index] = updatedProduct;

  return updatedProduct;
};

export default { getProducts, addProduct, updateProduct, getProductById };
