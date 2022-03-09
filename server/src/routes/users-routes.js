const Router = require('express').Router;

// import { Router } from 'express';
const { check } = require('express-validator');

// import { fileUpload } from '../middlewares/file-upload.js';

const { fileUpload } = require('../middlewares/file-upload');
const { checkAuth } = require('../middlewares/check-auth');

// import {
//     usersLogin,
//     usersSignup,
//     getUsers
// } from '../controllers/user-controllers';
const {
    usersLogin,
    usersSignup,
    getUsers,
    getUserById,
    updateUser
} = require('../controllers/user-controllers');

const router = Router();

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.post(
    '/signup',
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 })
    ],
    usersSignup
);

router.post('/login', usersLogin);

router.use(checkAuth);

router.patch(
    '/:userId/update',
    fileUpload.single('image'),
    [check('name').not().isEmpty()],
    updateUser
);

module.exports = router;
