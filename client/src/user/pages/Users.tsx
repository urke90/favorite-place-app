import { useEffect, useState } from 'react';

import useAxios from 'hooks/use-axios';
import { UserModel } from 'models/user/userModel';
import UserList from '../components/UserList';
import ErrorModal from 'shared/components/UI/Modals/ErrorModal';
import LoadingSpinner from 'shared/components/UI/LoadingSpinner';

const Users = () => {
    const { isLoading, error, sendRequest, clearErrorHandler } = useAxios();
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await sendRequest({
                url: '/api/users'
            });

            setUsers(response.users);
        };

        fetchUsers();
    }, [sendRequest]);

    return (
        <>
            <ErrorModal error={error} onCloseModal={clearErrorHandler} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && users && <UserList users={users} />}
        </>
    );
};

export default Users;
