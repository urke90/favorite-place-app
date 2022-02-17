import useForm from 'hooks/use-form';
import useAxios from 'hooks/use-axios';
import { FormState } from 'models/form/form';
import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from 'util/validatiors';

import './PlaceForm.css';

// Define state in component since usePlaceForm needs to be passed state.
const newPlaceInitState: FormState = {
    inputs: {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    },
    formIsValid: false
};

const NewPlace: React.FC = () => {
    const { isLoading, error, clearErrorHandler, sendRequest } = useAxios();
    const [newPlaceState, inputChangeHandler] = useForm(newPlaceInitState);

    const newPlaceSubmitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        console.log('newPlaceState', newPlaceState);

        /**
         * title,
         * description
         * imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
         * ! locationCordinates ----> generated coords on BE side
         * address
         * creatorId
         */
        console.log('newPlaceState', newPlaceState);
        const { address, descritpion, title } = newPlaceState.inputs;
        const data = {
            title: title.value,
            descritpion: descritpion.value,
            address: address.value,
            creatorId: 'this should be string of userId',
            imageUrl:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg'
        };
    };

    return (
        <form className="place-form" onSubmit={newPlaceSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                errorText="Please enter a valid title"
                validators={[VALIDATOR_REQUIRE()]}
                onInputChange={inputChangeHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                errorText="Please eneter a valid description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInputChange={inputChangeHandler}
            />
            <Input
                id="address"
                element="input"
                label="Address"
                errorText="Please enter a valid address"
                validators={[VALIDATOR_REQUIRE()]}
                onInputChange={inputChangeHandler}
            />
            <Button disabled={!newPlaceState.formIsValid} type="submit">
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
