import { Router } from 'express';
import { check } from 'express-validator';

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

export default router;
