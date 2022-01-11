import UserItem from './UserItem';

import { UserModel } from '../../models/userModel';
import './UserList.css';

const UserList: React.FC<{ users: UserModel[] }> = ({ users }) => {
    if (users.length === 0) {
        return (
            <div className="center">
                <h2>No users found!</h2>
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
                    placeCount={user.places}
                />
            ))}
        </ul>
    );
};

export default UserList;
