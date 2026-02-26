import type { NextFunction, Request, Response } from 'express';
import { UserRole } from '../types';
import { throwAppError } from '../../utils/errorMiddleware';

export const requireRole = (allowedRoles: UserRole[]) => {
    return (req: Request, _res: Response, _next: NextFunction): void => {
        try {
            if (!req.user) {
                throwAppError('User not authenticated', 401);
            }

            if (!allowedRoles.includes(req.user.role)) {
                throwAppError('Forbidden: insufficient permissions', 403);
            }

            _next();
        } catch (error) {
            _next(error);
        }
    };
};
