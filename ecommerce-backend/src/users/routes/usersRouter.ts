import express, { type NextFunction, type Response } from 'express';
import { PublicUser } from '../types';
import userService from '../services/userService';

const router = express.Router();

//GET /api/users
router.get(
  '/',
  async (_req, res: Response<PublicUser[]>, next: NextFunction) => {
    try {
      res.send(userService.getUsers());
    } catch (error) {
      console.error('Error getting users:', error);
      next(error);
    }
  }
);

export default router;
