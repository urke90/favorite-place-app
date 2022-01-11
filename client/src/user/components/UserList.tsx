import UserItem from './UserItem';

import { UserModel } from '../../models/user/userModel';
import Card from 'shared/components/UI/Card';
import './UserList.css';

const UserList: React.FC<{ users: UserModel[] }> = ({ users }) => {
    if (users.length === 0) {
        return (
            <Card className="center">
                <h2>No users found!</h2>
            </Card>
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
