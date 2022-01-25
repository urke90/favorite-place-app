import { useParams } from 'react-router-dom';

import usePlaceForm from 'hooks/use-form';
import { PlacesState } from 'models/places/places';
import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import Card from 'shared/components/UI/Card';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from 'shared/util/validatiors';

import './PlaceForm.css';

/**
 * this apporach should be fine for now until Node BE and DB is introduced.
 * when BE is is finished we will have async call and we should have function that will set input values in place form reducer
 * we should also have load spinner and error msg and show form ONLY if we have form
 */

const DUMMY_PLACES: PlacesState[] = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
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
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creatorId: 'u2'
    }
];

const UpdatePlace: React.FC = () => {
    const { placeId } = useParams();

    const placeToUpdate = DUMMY_PLACES.find((place) => place.id === placeId);

    const [updatePlaceFormState, inputChangeHandler] = usePlaceForm({
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

    const placeUpdateSubmitHandler = (
        evt: React.FormEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();
        console.log('updatePlaceFormState', updatePlaceFormState.inputs);
    };

    if (!placeToUpdate) {
        return (
            <div className="center">
                <Card>
                    <h2>Place Not Found</h2>
                </Card>
            </div>
        );
    }

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
                initValue={updatePlaceFormState.inputs.title.value}
                initValid={updatePlaceFormState.inputs.title.isValid}
            />
            <Input
                id="description"
                label="Description"
                element="textarea"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInputChange={inputChangeHandler}
                errorText="Please enter a valid title"
                initValue={updatePlaceFormState.inputs.description.value}
                initValid={updatePlaceFormState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!updatePlaceFormState.formIsValid}>
                UPDATE
            </Button>
        </form>
    );
};

export default UpdatePlace;

/**
 * route ===> /place/place-id --- add to app.tsx  ----> DONE
 * na osnovu parama izvucem placeId - i pronajdem u dummy places ---> DONE
 * ako ne postoji mesto vratim div h2 Could not find place renderujem ---> DONE
 * 1. input --- title ---> validator ---> required, Please enter a valid title
 * 2. textarea- description ---> min-length err ---> Please enter a valid desc ( 5 characters min )
 * dodati defaultValue, valid props za input (valid ---> znaci da je vec validirano, ne mora opet)
 *
 * Input.tsx --- komp mora da prima 2 nova props ---> defaultValue, i valid ---> da je vec validirano i defaultvalue --- ako postoji place da popunimo inpute
 *
 * MORAMO DA REUSE REDUCER ZA PRAVLJENJE NEW PLACE DA  SE KORISTI I ZA UPDATE
 */
