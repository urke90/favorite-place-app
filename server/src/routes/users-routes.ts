import { Router } from 'express';

import {
    usersLogin,
    usersSignup,
    getUsers
} from '../controllers/user-controllers';

const router = Router();

router.get('/', getUsers);

router.post('/signup', usersSignup);

router.post('/login', usersLogin);

export default router;
