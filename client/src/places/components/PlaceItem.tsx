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
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const openMapHandler = () => setShowGoogleMap(true);

    const closeMapHandler = () => setShowGoogleMap(false);

    const toggleDeleteModalHandler = () =>
        setShowDeleteModal((prevShowState) => !prevShowState);

    // add logic for deleting place when we have BE ready
    const deletePlaceHandler = () => {
        console.log('DELETED PLACE');
    };

    console.log('showDeleteModal', showDeleteModal);

    return (
        <>
            <Modal
                showModal={showGoogleMap}
                onCloseModal={closeMapHandler}
                header={address}
                contentClass="place-item__model-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map />
                </div>
            </Modal>
            <Modal
                showModal={showDeleteModal}
                onCloseModal={toggleDeleteModalHandler}
                header="Delete place?"
                footerClass="place-item__modal-actions"
                footer={
                    <>
                        <Button inverse onClick={toggleDeleteModalHandler}>
                            CLOSE
                        </Button>
                        <Button danger onClick={deletePlaceHandler}>
                            DELETE
                        </Button>
                    </>
                }
            >
                <p>
                    Deleting place can't be undone. Are you sure you want to
                    delete place anyway?
                </p>
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
                        <Button onClick={openMapHandler} inverse>
                            VIEW ON MAP
                        </Button>
                        <Button to={`/places/${id}`}>EDIT</Button>
                        <Button onClick={toggleDeleteModalHandler} danger>
                            DELETE
                        </Button>
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;
