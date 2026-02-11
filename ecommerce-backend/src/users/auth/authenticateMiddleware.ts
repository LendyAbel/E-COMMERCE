import jwt from 'jsonwebtoken';
import type { JwtPayload } from '../util';
import type { NextFunction, Request, Response } from 'express';
import { throwAppError } from '../../utils/errorMiddleware';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export const authenticateMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throwAppError('Authorization header missing or malformed', 401);
    return;
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.user = {
      id: decodedToken.userId,
      email: decodedToken.email,
      role: decodedToken.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};
