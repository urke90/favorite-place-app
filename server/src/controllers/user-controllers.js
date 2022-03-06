// import { validationResult } from 'express-validator';
const { validationResult } = require('express-validator');

// import bcrypt from 'bcryptjs';
const bcrypt = require('bcryptjs');

// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

// import HttpError from '../types/error/http-error';
const HttpError = require('../models/http-error');

const User = require('../models/user');

exports.getUsers = async (req, res, next) => {
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

exports.usersLogin = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return next(new HttpError('Login failed, please try again', 500));
    }

    if (!existingUser) {
        return next(
            new HttpError('Invalid credentials, could not log you in.', 403)
        );
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
            new HttpError('Invalid credentials, could not log you in.', 403)
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

exports.usersSignup = async (req, res, next) => {
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

exports.getUserById = async (req, res, next) => {
    const userId = req.params.userId;

    let user;
    try {
        user = await User.findById(userId, '-password');
        console.log('user from get user by id', user);
    } catch (err) {
        return next(
            new HttpError('Something went wrong, please try again!', 500)
        );
    }
    res.status(200).json({ user: user.toObject({ getters: true }) });
};
