import { useState } from 'react';

import Card from 'shared/components/UI/Card';
import { PlacesProps } from 'models/places/places';
import Button from 'shared/components/FormElements/Button';
import Modal from 'shared/components/UI/Modal';
import Map from 'shared/components/UI/Map';

import './PlaceItem.css';

const PlaceItem: React.FC<PlacesProps> = ({
    imageUrl,
    title,
    description,
    address,
    id
}) => {
    const [showGoogleMap, setShowGoogleMap] = useState(false);

    const openMapHandler = () => setShowGoogleMap(true);

    const closeMapHandler = () => setShowGoogleMap(false);

    return (
        <>
            <Modal
                showModal={showGoogleMap}
                onCloseModal={closeMapHandler}
                header={address}
                contentClass="place-item__model-content"
                footerClass="place-item__modal-actions"
                footer={<Button onBtnClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map />
                </div>
            </Modal>
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
                        <Button onBtnClick={openMapHandler} inverse>
                            VIEW ON MAP
                        </Button>
                        <Button to={`/places/${id}`}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;
