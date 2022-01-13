import Card from 'shared/components/UI/Card';
import { PlacesProps } from 'models/places/places';
import './PlaceItem.css';

const PlaceItem: React.FC<PlacesProps> = ({
    imageUrl,
    title,
    description,
    address
}) => {
    return (
        <li className="place-item">
            <Card className="place-item__content">
                <div className="place-item__image">
                    <img src={imageUrl} alt={title} />
                </div>
                <div className="place-item__info">
                    <h2>{title}</h2>
                    <h3>{address}</h3>
                    <p>{description}</p>
                </div>
                <div className="place-item__actions">
                    <button>VIEW ON MAP</button>
                    <button>EDIT</button>
                    <button>DELETE</button>
                </div>
            </Card>
        </li>
    );
};

export default PlaceItem;
