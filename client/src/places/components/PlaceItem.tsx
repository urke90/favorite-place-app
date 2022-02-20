import useToggle from 'hooks/use-toggle';
import useAxios from 'hooks/use-axios';
import useAuth from 'hooks/use-auth';
import Card from 'shared/components/UI/Card';
import { IPlace } from 'types/places/places';
import Button from 'shared/components/FormElements/Button';
import Modal from 'shared/components/UI/Modals/Modal';
import Map from 'shared/components/UI/Map';
import ErrorModal from 'shared/components/UI/Modals/ErrorModal';
import LoadingSpinner from 'shared/components/UI/LoadingSpinner';

import './PlaceItem.css';

const PlaceItem: React.FC<{
    place: IPlace;
    onDelete: (placeId: string) => void;
}> = ({
    place: { address, id, title, description, image, creatorId },
    onDelete
}) => {
    const [showGoogleMap, toggleGoogleMapHandler] = useToggle(false);
    const [showDeleteModal, toggleDeletePlaceModal] = useToggle(false);
    const { isLoading, error, clearErrorHandler, sendRequest } = useAxios();
    const { isLoggedIn, userId } = useAuth();

    const confirmDeletePlaceHandler = async () => {
        toggleDeletePlaceModal();
        try {
            const response = await sendRequest({
                url: `/api/places/${id}`,
                method: 'DELETE'
            });

            onDelete(id);
        } catch (err) {}
    };

    return (
        <>
            <ErrorModal error={error} onCloseModal={clearErrorHandler} />
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
                        <Button danger onClick={confirmDeletePlaceHandler}>
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
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className="place-item__image">
                        <img src={image} alt={title} />
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
                        {userId === creatorId && (
                            <Button to={`/places/${id}`}>EDIT</Button>
                        )}
                        {userId === creatorId && (
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
