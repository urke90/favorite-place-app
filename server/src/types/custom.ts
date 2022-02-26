import Express, { Request, Response, NextFunction } from 'express';

export interface IRequestExt extends Request {
    userData?: any;
}
