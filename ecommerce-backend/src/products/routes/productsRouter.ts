import express, { Request, Response } from 'express';

import { Product } from '../../types';

import productService from '../services/productServices';
import { toNewProduct } from '../util';

const router = express.Router();

router.get('/', (_req, res: Response<Product[]>) => {
  res.send(productService.getProducts());
});

router.get(
  '/:id',
  (req: Request, res: Response<Product | { error: string }>) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).send({ error: 'Missing product id in params' });
      }
      const product = productService.getProductById(id);
      return res.status(200).send(product);
    } catch (error) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
      }
      return res.status(400).send({ error: errorMessage });
    }
  }
);

router.post('/', (req: Request, res: Response<Product | { error: string }>) => {
  try {
    const newProductData = toNewProduct(req.body);
    const newProduct = productService.addProduct(newProductData);
    return res.status(201).send(newProduct);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    return res.status(400).send({ error: errorMessage });
  }
});

router.put(
  '/:id',
  (req: Request, res: Response<Product | { error: string }>) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).send({ error: 'Missing product id in params' });
      }

      const newProductData = toNewProduct(req.body);
      const updatedProduct = productService.updateProduct(id, newProductData);
      return res.status(200).send(updatedProduct);
    } catch (error) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
      }
      return res.status(400).send({ error: errorMessage });
    }
  }
);

export default router;
