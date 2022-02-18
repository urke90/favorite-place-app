import { useParams } from 'react-router-dom';

import useForm from 'hooks/use-form';
import useAxios from 'hooks/use-axios';
import { IPlace } from 'types/places/places';
import { IFormState } from 'types/form/form';
import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import Card from 'shared/components/UI/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from 'util/validatiors';

import './PlaceForm.css';
import { useEffect, useState } from 'react';
import LoadingSpinner from 'shared/components/UI/LoadingSpinner';
import ErrorModal from 'shared/components/UI/Modals/ErrorModal';

/**
 * this apporach should be fine for now until Node BE and DB is introduced.
 * when BE is is finished we will have async call and we should have function that will set input values in place form reducer
 * we should also have load spinner and error msg and show form ONLY if we have form
 */

/**
 * 1. when page loads we should fecth places with placeId
 * IF THERE IS NOT PLACE ID WE SHOULD STOP!!!!!!!!!!!!!!!!!!
 *
 */

const updatePlaceForm: IFormState = {
    inputs: {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    },
    formIsValid: false
};

interface IUpdatePlaceData {
    title: string;
    description: string;
}

const UpdatePlace: React.FC = () => {
    const { placeId } = useParams<{ placeId: string }>();
    const [loadedPlace, setloadedPlace] = useState<IPlace | undefined>();
    const { isLoading, error, clearErrorHandler, sendRequest } = useAxios();
    const [updatePlaceState, inputChangeHandler, setFormData] =
        useForm(updatePlaceForm);

    if (!placeId) throw new Error('Place ID not available');

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await sendRequest({
                    url: `/api/places/${placeId}`
                });

                if (!response || response.status !== 200) {
                    throw new Error('Something went wrong. Please try later');
                }

                setFormData({
                    inputs: {
                        title: {
                            value: response.data.place.title,
                            isValid: true
                        },
                        description: {
                            value: response.data.place.description,
                            isValid: true
                        }
                    },
                    formIsValid: false
                });
                setloadedPlace(response.data.place);
            } catch (err) {}
        };
        fetchPlaces();
    }, [placeId, sendRequest, setFormData]);

    if (!isLoading && !loadedPlace && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Place Not Found</h2>
                </Card>
            </div>
        );
    }

    const updatePlaceSubmitHandler = async (
        evt: React.FormEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();
        console.log('updatePlaceState', updatePlaceState.inputs);

        const data: IUpdatePlaceData = {
            title: updatePlaceState.inputs.title.value,
            description: updatePlaceState.inputs.description.value
        };

        try {
            const response = await sendRequest({
                url: `/api/places/${placeId}`,
                method: 'PATCH',
                data
            });
            console.log('response', response);
        } catch (err) {}
    };

    return (
        <>
            <ErrorModal error={error} onCloseModal={clearErrorHandler} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedPlace && (
                <form
                    className="place-form"
                    onSubmit={updatePlaceSubmitHandler}
                >
                    <Input
                        id="title"
                        label="Title"
                        element="input"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInputChange={inputChangeHandler}
                        errorText="Please enter a valid title"
                        initValue={updatePlaceState.inputs.title.value}
                        initValid
                    />
                    <Input
                        id="description"
                        label="Description"
                        element="textarea"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        onInputChange={inputChangeHandler}
                        errorText="Please enter a valid title"
                        initValue={updatePlaceState.inputs.description.value}
                        initValid
                    />
                    <Button
                        type="submit"
                        disabled={!updatePlaceState.formIsValid}
                    >
                        UPDATE
                    </Button>
                </form>
            )}
        </>
    );
};

export default UpdatePlace;
