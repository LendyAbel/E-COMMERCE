import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserRole } from './types';

export const validJtwSecret = (): string => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }
  return JWT_SECRET;
};

const JWT_EXPIRES_IN = '1h';
const SALT_ROUNDS = 10;

export interface JwtPayload {
  userId: string;
  role: UserRole;
  email: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const signToken = (user: User): string => {
  const JWT_SECRET = validJtwSecret();

  const payload: JwtPayload = {
    userId: user.id,
    role: user.role,
    email: user.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
