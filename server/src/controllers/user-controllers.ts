import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

import HttpError from '../types/error/http-error';
import { IUser } from 'types/user/user';

const DUMMY_USERS: IUser[] = [
    {
        id: 'u1',
        name: 'Milos Degenek',
        email: 'kurobecalo@gmail.com',
        password: 'abc123'
    },
    {
        id: 'u2',
        name: 'Nemanja Bjelica',
        email: 'bjelica@gmail.com',
        password: '123abc'
    }
];

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
    res.json({ users: DUMMY_USERS });
};

export const usersLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = DUMMY_USERS.find((u) => u.email === email);

    if (!existingUser || existingUser.password !== password)
        throw new HttpError('User not found', 401);

    res.json({ message: 'Logged in!' });
};

export const usersSignup = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new HttpError(
            'invalid inputs passed, please check your data',
            422
        );
    }
    const { name, email, password } = req.body;

    const isExistingUser = DUMMY_USERS.find((u) => u.email === email);

    if (isExistingUser)
        throw new HttpError('User with this email already exist', 422);

    const newUser: IUser = {
        id: uuidv4(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(newUser);

    res.json({ user: newUser });
};
