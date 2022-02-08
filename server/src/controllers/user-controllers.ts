import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

import HttpError from '../types/error/http-error';
import { IUser } from 'types/user/user';
import User from '../models/user';

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

export const usersSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError('invalid inputs passed, please check your data', 422)
        );
    }
    const { name, email, password, places } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email }).exec();
    } catch (err) {
        return next(new HttpError('Signup failed, please try again', 500));
    }

    if (existingUser) {
        return next(
            new HttpError('User exists already, please login instead', 422)
        );
    }

    const createdUser = new User({
        name,
        email,
        avatar: 'http://*www.w3schools.com/bootstrap/img_avatar3.png',
        password,
        places
    });

    try {
        // * save() ===  used for saving entry in DB
        await createdUser.save();
    } catch (err) {
        return next(new HttpError('Signup failed, please try again!', 500));
    }

    res.json({ user: createdUser.toObject({ getters: true }) });
};
