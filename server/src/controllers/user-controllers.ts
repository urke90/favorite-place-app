import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import HttpError from '../types/error/http-error';
import User from '../models/user';

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let users;

    try {
        users = await User.find({}, '-password');
    } catch (err) {
        return next(
            new HttpError('Fetching users failed, please try again', 500)
        );
    }

    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

export const usersLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return next(new HttpError('Login failed, please try again', 500));
    }

    if (!existingUser) {
        return next(new HttpError('Invalid credentials', 401));
    }

    let passwordIsValid = false;

    try {
        passwordIsValid = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return next(
            new HttpError('Could not log you in, check your credentials', 500)
        );
    }

    if (!passwordIsValid) {
        return next(
            new HttpError('Invalid credentials, could not log you in.', 401)
        );
    }

    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            'supersecret_dont_share',
            { expiresIn: '1h' }
        );
    } catch (err) {
        return next(new HttpError('Signup failed, please try again!', 500));
    }

    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token
    });
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
    const { name, email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return next(new HttpError('Signup failed, please try again', 500));
    }

    if (existingUser) {
        return next(
            new HttpError('User exists already, please login instead', 422)
        );
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return next(
            new HttpError('Could not create user, please try again', 422)
        );
    }

    const createdUser = new User({
        name,
        email,
        image: 'http://www.w3schools.com/bootstrap/img_avatar3.png',
        password: hashedPassword,
        places: []
    });

    try {
        // * save() ===  used for saving entry in DB
        await createdUser.save();
    } catch (err) {
        return next(new HttpError('Signup failed, please try again!', 500));
    }

    let token;
    try {
        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email },
            'supersecret_dont_share',
            { expiresIn: '1h' }
        );
    } catch (err) {
        return next(new HttpError('Signup failed, please try again!', 500));
    }

    res.status(201).json({
        userId: createdUser.id,
        email: createdUser.email,
        token
    });
};
