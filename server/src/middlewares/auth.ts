import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import HttpError from '../types/error/http-error';

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed!');
        }
        const decodedToken: any = jwt.verify(token, 'supersecret_dont_share');

        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        return next(new HttpError('Authentiaction failed!', 401));
    }
};
