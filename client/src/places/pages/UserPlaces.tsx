import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useAxios from 'hooks/use-axios';
import { IPlace } from 'types/places/places';
import PlaceList from 'places/components/PlaceList';
import ErrorModal from 'shared/components/UI/Modals/ErrorModal';
import LoadingSpinner from 'shared/components/UI/LoadingSpinner';

const Places: React.FC = () => {
    const { isLoading, error, clearErrorHandler, sendRequest } = useAxios();
    const [places, setPlaces] = useState<IPlace[]>([]);
    const { userId } = useParams<{ userId: string }>();

    if (!userId) throw new Error('User Id missing');

    const deletePlaceHandler = (placeId: string) => {
        console.log('placeId from deletePlaceHandler', placeId);
        setPlaces((prevPlaces) =>
            prevPlaces.filter((place) => place.id !== placeId)
        );
    };

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await sendRequest({
                    url: `/api/places/user/${userId}`
                });

                if (!response || response.status !== 200) {
                    throw new Error('Fetch places not working!');
                }

                setPlaces(response.data.places);
            } catch (err) {}
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    return (
        <>
            <ErrorModal error={error} onCloseModal={clearErrorHandler} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && places && (
                <PlaceList items={places} onDelete={deletePlaceHandler} />
            )}
        </>
    );
};

export default Places;
