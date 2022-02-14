import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserModel } from 'models/user/userModel';
import UserList from '../components/UserList';

const DUMMY_USERS: UserModel[] = [
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

const Users = () => {
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('/api/users');
            console.log('response fetch users', response);

            if (response.status !== 200) return;

            setUsers(response.data.users);
        };
        fetchUsers();
    }, []);

    return <UserList users={users} />;
};

export default Users;
