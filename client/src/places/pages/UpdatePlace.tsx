import { useParams } from 'react-router-dom';

import useForm from 'hooks/use-form';
import { IPlace } from 'types/places/places';
import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import Card from 'shared/components/UI/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from 'util/validatiors';

import './PlaceForm.css';

/**
 * this apporach should be fine for now until Node BE and DB is introduced.
 * when BE is is finished we will have async call and we should have function that will set input values in place form reducer
 * we should also have load spinner and error msg and show form ONLY if we have form
 */

const DUMMY_PLACES: IPlace[] = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creatorId: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creatorId: 'u2'
    }
];

const UpdatePlace: React.FC = () => {
    const { placeId } = useParams<{ placeId: string }>();

    const placeToUpdate = DUMMY_PLACES.find((place) => place.id === placeId);

    const [updatePlaceState, inputChangeHandler] = useForm({
        inputs: {
            title: {
                value: placeToUpdate?.title || '',
                isValid: true
            },
            description: {
                value: placeToUpdate?.description || '',
                isValid: true
            }
        },
        formIsValid: true
    });

    if (!placeToUpdate) {
        return (
            <div className="center">
                <Card>
                    <h2>Place Not Found</h2>
                </Card>
            </div>
        );
    }

    const placeUpdateSubmitHandler = (
        evt: React.FormEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();
        console.log('updatePlaceState', updatePlaceState.inputs);
    };

    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="title"
                label="Title"
                element="input"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInputChange={inputChangeHandler}
                errorText="Please enter a valid title"
                initValue={updatePlaceState.inputs.title.value}
                initValid={updatePlaceState.inputs.title.isValid}
            />
            <Input
                id="description"
                label="Description"
                element="textarea"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInputChange={inputChangeHandler}
                errorText="Please enter a valid title"
                initValue={updatePlaceState.inputs.description.value}
                initValid={updatePlaceState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!updatePlaceState.formIsValid}>
                UPDATE
            </Button>
        </form>
    );
};

export default UpdatePlace;
