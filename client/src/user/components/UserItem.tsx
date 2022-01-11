import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UI/Avatar';
import Card from '../../shared/components/UI/Card';
import './UserItem.css';

import { UserProps } from 'models/user/userProps';

const UserItem: React.FC<UserProps> = ({ id, image, name, places }) => {
    return (
        <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/${id}/places`}>
                    <div className="user-item__image">
                        <Avatar
                            image={image}
                            alt={name}
                            className=""
                            width=""
                            styles=""
                        />
                    </div>
                    <div className="user-item__info">
                        <h2>{name}</h2>
                        <h3>
                            {places} {places === 1 ? 'Place' : 'Places'}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;
