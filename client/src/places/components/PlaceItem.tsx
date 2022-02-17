import useToggle from 'hooks/use-toggle';
import useAuth from 'hooks/use-auth';
import Card from 'shared/components/UI/Card';
import { PlacesProps } from 'models/places/places';
import Button from 'shared/components/FormElements/Button';
import Modal from 'shared/components/UI/Modals/Modal';
import Map from 'shared/components/UI/Map';

import './PlaceItem.css';

const PlaceItem: React.FC<PlacesProps> = ({
    imageUrl,
    title,
    description,
    address,
    id
}) => {
    const [showGoogleMap, toggleGoogleMapHandler] = useToggle(false);
    const [showDeleteModal, toggleDeletePlaceModal] = useToggle(false);
    const { isLoggedIn } = useAuth();

    // add logic for deleting place when we have BE ready
    const deletePlaceHandler = () => {
        console.log('DELETED PLACE');
    };

    return (
        <>
            <Modal
                showModal={showGoogleMap}
                onCloseModal={toggleGoogleMapHandler}
                header={address}
                contentClass="place-item__model-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={toggleGoogleMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map />
                </div>
            </Modal>
            <Modal
                showModal={showDeleteModal}
                onCloseModal={toggleDeletePlaceModal}
                header="Delete place?"
                footerClass="place-item__modal-actions"
                footer={
                    <>
                        <Button inverse onClick={toggleDeletePlaceModal}>
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
                        <Button onClick={toggleGoogleMapHandler} inverse>
                            VIEW ON MAP
                        </Button>
                        {isLoggedIn && (
                            <Button to={`/places/${id}`}>EDIT</Button>
                        )}
                        {isLoggedIn && (
                            <Button onClick={toggleDeletePlaceModal} danger>
                                DELETE
                            </Button>
                        )}
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;
