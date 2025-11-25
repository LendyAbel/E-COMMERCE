import express, { Response } from 'express';

import { Product } from '../../types';

import productService from '../services/productServices';

const router = express.Router();

router.get('/', (_req, res: Response<Product[]>) => {
  res.send(productService.getProducts());
});

export default router;
