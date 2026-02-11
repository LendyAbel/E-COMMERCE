import { products } from '../../data/products-list';
import { Product } from '../types';

import { v4 as uuid } from 'uuid';
import { NewProductValidator } from '../validators/newProductValidator';
import { throwAppError } from '../../utils/errorMiddleware';

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

  if (!product) {
    throwAppError(`Product with id: ${id} not found`, 404);
  }
  return product;
};

const addProduct = (data: unknown): Product => {
  const product = NewProductValidator.validate(data);
  const id = uuid();
  const productWithId = { id, ...product };
  const productWithStock = parseStock(productWithId);

  const newProduct = { ...productWithStock };

  products.unshift(newProduct);
  return newProduct;
};

const updateProduct = (id: string, data: unknown): Product => {
  const product = NewProductValidator.validate(data);

  const index = products.findIndex(p => p.id === id);
  if (index === -1) throwAppError(`Product with id: ${id} not found`, 404);

  const mergedProduct: Product = { ...products[index], ...product, id };
  const updatedProduct = parseStock(mergedProduct);

  products[index] = updatedProduct;

  return updatedProduct;
};

export default { getProducts, addProduct, updateProduct, getProductById };
