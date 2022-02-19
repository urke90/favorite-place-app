import { IPlace } from 'types/places/places';
import Card from 'shared/components/UI/Card';
import PlaceItem from './PlaceItem';
import Button from 'shared/components/FormElements/Button';
import './PlaceList.css';

const PlaceList: React.FC<{
    items: IPlace[];
    onDelete: (placeId: string) => void;
}> = ({ items, onDelete }) => {
    if (items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button to="/places/new">Share Place</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="place-list">
            {items.map((place) => (
                <PlaceItem key={place.id} place={place} onDelete={onDelete} />
            ))}
        </ul>
    );
};

export default PlaceList;
