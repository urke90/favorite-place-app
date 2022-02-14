import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserModel } from 'models/user/userModel';
import UserList from '../components/UserList';

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
