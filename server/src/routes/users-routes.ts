import { Router } from 'express';
import { check } from 'express-validator';

import { fileUpload } from '../middlewares/file-upload.js';

import {
    usersLogin,
    usersSignup,
    getUsers
} from '../controllers/user-controllers';

const router = Router();

router.get('/', getUsers);

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

router.patch(
    '/:userId/update',
    fileUpload.single('image'),
    [check('name').not().isEmpty()],
    (req, res, next) => {
        /**
         * We want to update user info in this middleware
         * We should allow updating USER image and USER name
         * ? reset pw ???? ==== can it be updated with this req??????????????????
         * ****************************************************************************
         * 1. GET user with corresponding ID
         * 2. update name AND image or    name OR image
         *
         */
        const userId = req.params.userId;
        console.log('userId from user PATCH', userId);
    }
);

export default router;
