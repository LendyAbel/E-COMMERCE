import { type Request, type Response, type NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
}

export function throwAppError(message: string, statusCode: number): never {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  throw error;
}

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof Error) {
    const appError = error as AppError;
    const status = appError.statusCode ?? 500;

    res.status(status).json({ error: appError.message });
    return;
  }

  res.status(500).json({ error: 'Unexpected error' });
};
