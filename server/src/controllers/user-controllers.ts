import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import HttpError from '../models/error/http-error';
import { IUser } from 'models/user/user';

const DUMMY_USERS: IUser[] = [
    {
        id: 'u1',
        name: 'Milos Degenek',
        email: 'kurobecalo@gmail.com',
        password: 'abc123'
    }
    // {
    //     id: 'u2',
    //     name: 'Nemanja Bjelica',
    //     email: 'bjelica@gmail.com',
    //     password: '123abc'
    // }
];

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
    res.json({ users: DUMMY_USERS });
};

export const usersLogin = (req: Request, res: Response, next: NextFunction) => {
    console.log('usersLogin');
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
    const { name, email, password } = req.body;

    const isExistingUser = DUMMY_USERS.find((u) => u.email === email);

    if (isExistingUser)
        throw new HttpError('User with this email already exist', 422);

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(newUser);

    res.json({ user: newUser });
};
