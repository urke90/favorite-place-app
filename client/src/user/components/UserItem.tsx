import { Link } from 'react-router-dom';

import { IUser } from 'types/user/user';
import Avatar from '../../shared/components/UI/Avatar';
import Card from '../../shared/components/UI/Card';
import './UserItem.css';

const UserItem: React.FC<IUser> = ({ id, image, name, places }) => {
    return (
        <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/${id}/places`}>
                    <div className="user-item__image">
                        <Avatar image={image} alt={name} />
                    </div>
                    <div className="user-item__info">
                        <h2>{name}</h2>
                        <h3>
                            {places.length}{' '}
                            {places.length === 1 ? 'Place' : 'Places'}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;
