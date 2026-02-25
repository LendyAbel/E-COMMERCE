import express, { NextFunction, Response } from 'express';
import { ProductCategory } from '../ProductTypes';
import categoriesServices from '../services/categoriesServices';

const router = express.Router();

router.get(
    '/',
    (_req, res: Response<ProductCategory[]>, next: NextFunction) => {
        try {
            res.send(categoriesServices.getCategories());
        } catch (error) {
            console.error('Error getting categories:', error);
            next(error);
        }
    },
);

export default router;
