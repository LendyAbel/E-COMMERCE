import { type Request, type Response, type NextFunction } from 'express';
import { ZodError } from 'zod';

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
    _next: NextFunction,
): void => {
    //ZOD error
    if (error instanceof ZodError) {
        const formattedErrors = error.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message,
        }));

        res.status(400).json({
            error: 'Validation error',
            details: formattedErrors,
        });
        return;
    }
    //App error
    if (error instanceof Error) {
        const appError = error as AppError;
        const status = appError.statusCode ?? 500;
        console.log('APP ERROR **********', error);
        res.status(status).json({ error: appError.message });
        return;
    }
    //Unexpected error
    res.status(500).json({ error: 'Unexpected error' });
};
