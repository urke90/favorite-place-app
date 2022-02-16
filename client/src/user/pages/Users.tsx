import { useEffect, useState } from 'react';

import useAxios from 'hooks/use-axios';
import { UserModel } from 'models/user/userModel';
import UserList from '../components/UserList';
import Modal from 'shared/components/UI/Modals/Modal';
import LoadingSpinner from 'shared/components/UI/LoadingSpinner';
import Button from 'shared/components/FormElements/Button';

const Users = () => {
    const { isloading, error, sendRequest, clearErrorHandler } = useAxios();
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await sendRequest('/api/users', 'GET', null);

            setUsers(response.users);
        };

        fetchUsers();
    }, [sendRequest]);

    return (
        <>
            <Modal
                showModal={!!error}
                onCloseModal={clearErrorHandler}
                header="Error occured!"
                footer={<Button onClick={clearErrorHandler}>CLOSE</Button>}
            >
                {error}
            </Modal>
            {isloading && <LoadingSpinner asOverlay />}
            {!isloading && users && <UserList users={users} />}
        </>
    );
};

export default Users;
