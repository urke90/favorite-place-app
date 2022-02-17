import UserItem from './UserItem';

import { IUser } from '../../types/user/user';
import Card from 'shared/components/UI/Card';
import './UserList.css';

const UserList: React.FC<{ users: IUser[] }> = ({ users }) => {
    if (users.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No users found!</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {users.map((user) => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    places={user.places}
                />
            ))}
        </ul>
    );
};

export default UserList;
