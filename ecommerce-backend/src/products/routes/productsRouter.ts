import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';

import { Product } from '../types';

import productService from '../services/productServices';
import { toNewProduct } from '../util';
import { throwAppError } from '../../utils/errorMiddleware';
import { authenticateMiddleware } from '../../users/auth/authenticateMiddleware';
import { requireRole } from '../../users/auth/roleMiddleware';

const router = express.Router();

// GET /api/products

router.get('/', async (_req, res: Response<Product[]>, next: NextFunction) => {
  try {
    res.send(productService.getProducts());
  } catch (error) {
    console.error('Error getting products:', error);
    next(error);
  }
});

// GET /api/products/:id
router.get(
  '/:id',
  async (req: Request, res: Response<Product>, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (!id) {
        throwAppError('Missing product id in params', 400);
        return;
      }
      const product = productService.getProductById(id);
      res.status(200).send(product);
    } catch (error) {
      console.error('Error getting product by id:', error);
      next(error);
    }
  }
);

// POST /api/products
router.post(
  '/',
  authenticateMiddleware,
  requireRole(['admin']),
  async (req: Request, res: Response<Product>, next: NextFunction) => {
    try {
      const newProductData = toNewProduct(req.body);
      const newProduct = productService.addProduct(newProductData);
      res.status(201).send(newProduct);
    } catch (error: unknown) {
      console.error('Error adding new product:', error);
      next(error);
    }
  }
);

// PUT /api/products/:id
router.put(
  '/:id',
  authenticateMiddleware,
  requireRole(['admin']),
  async (req: Request, res: Response<Product>, next: NextFunction) => {
    try {
      const id = req.params.id;

      if (!id) {
        throwAppError('Missing product id in params', 400);
        return;
      }

      const newProductData = toNewProduct(req.body);
      const updatedProduct = productService.updateProduct(id, newProductData);
      res.status(200).send(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      next(error);
    }
  }
);

export default router;
