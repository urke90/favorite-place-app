import { Router } from 'express';

import { IUser } from 'models/user/user';

const router = Router();

const DUMMY_USERS: IUser[] = [
    {
        id: 'u1',
        name: 'Milos Degenek',
        image: 'https://ocdn.eu/pulscms-transforms/1/C18ktkpTURBXy82NjhkMDNjYmFmOWVhYjk2MWQ4NzUyMmQ4ZDI2ZWVhNS5qcGeRkwXNAkLNAYE',
        places: 3
    },
    {
        id: 'u2',
        name: 'Nemanja Bjelica',
        image: 'https://ocdn.eu/pulscms-transforms/1/UmcktkqTURBXy83NDM0NzJlNDdjYzYyM2U1MWMyYTJhNGRjZjBkMmM5ZC5qcGVnkZMFzQJCzQGB',
        places: 5
    }
];

export default router;
