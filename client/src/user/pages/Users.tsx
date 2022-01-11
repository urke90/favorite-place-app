import UserList from '../components/UserList';

import { UserModel } from '../../models/userModel';

const DUMMY_USERS: UserModel[] = [
    {
        id: 'u1',
        name: 'Milos Degenek',
        image: 'https://ocdn.eu/pulscms-transforms/1/C18ktkpTURBXy82NjhkMDNjYmFmOWVhYjk2MWQ4NzUyMmQ4ZDI2ZWVhNS5qcGeRkwXNAkLNAYE',
        places: 3
    }
    // {
    //     id: 'u2',
    //     name: 'Nemanja Bjelica',
    //     image: 'https://ocdn.eu/pulscms-transforms/1/UmcktkqTURBXy83NDM0NzJlNDdjYzYyM2U1MWMyYTJhNGRjZjBkMmM5ZC5qcGVnkZMFzQJCzQGB',
    //     places: 5
    // }
];

const Users = () => {
    return <UserList users={DUMMY_USERS} />;
};

export default Users;
