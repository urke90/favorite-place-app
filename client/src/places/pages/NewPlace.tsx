import usePlaceForm from 'hooks/use-form';
import { NewUpdatePlaceState } from 'models/places/updateNewPlace';
import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from 'shared/util/validatiors';

import './NewPlace.css';

// Define state in component since usePlaceForm needs to be passed state.
const newPlaceInitState: NewUpdatePlaceState = {
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

const NewPlace: React.FC = () => {
    const [newPlaceState, inputChangeHandler] = usePlaceForm(newPlaceInitState);
    console.log('newPlaceState', newPlaceState);
    console.log('inputChangeHandler', inputChangeHandler);

    const newPlaceSubmitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
    };

    return (
        <form className="place-form" onSubmit={newPlaceSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                errorText="Please eneter a valid title"
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
