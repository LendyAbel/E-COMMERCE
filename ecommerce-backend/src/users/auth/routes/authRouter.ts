import express, { NextFunction, type Request, type Response } from 'express';
import { AuthResponse, LoginBody, RegisterBody } from '../../types';
import { comparePassword, hashPassword, signToken } from '../../util';
import userService from '../../services/userService';

import { throwAppError } from '../../../utils/errorMiddleware';

const router = express.Router();

// POST /api/auth/register
router.post(
  '/register',
  async (
    req: Request<unknown, unknown, RegisterBody>,
    res: Response<AuthResponse>,
    next: NextFunction
  ) => {
    try {
      const { email, password, role = 'user' } = req.body;

      if (!email || !password) {
        throwAppError('Email and password are required', 400);
        return;
      }

      if (role !== undefined && role !== 'admin' && role !== 'user') {
        throwAppError('Invalid role', 400);
        return;
      }

      const passwordHash = await hashPassword(password);
      const user = userService.createUser({ email, passwordHash, role });

      const token = signToken(user);

      res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error('Error during registration:', error);
      next(error);
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  async (
    req: Request<unknown, unknown, LoginBody>,
    res: Response<AuthResponse>,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throwAppError('Email and password are required', 400);
        return;
      }

      const user = userService.getUserByEmail(email);
      if (!user) {
        throwAppError('Invalid email', 401);
        return;
      }

      const isValidPassword = await comparePassword(
        password,
        user.passwordHash
      );
      if (!isValidPassword) {
        throwAppError('Invalid password', 401);
        return;
      }

      const token = signToken(user);

      res.status(200).json({
        user: { id: user.id, email: user.email, role: user.role },
        token,
      });
    } catch (error) {
      console.error('Error during login:', error);
      next(error);
    }
  }
);

export default router;
