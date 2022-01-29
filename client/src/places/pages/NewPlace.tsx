import useForm from 'hooks/use-form';
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
    const [newPlaceState, inputChangeHandler] = useForm(newPlaceInitState);

    const newPlaceSubmitHandler = (
        evt: React.FormEvent<HTMLFormElement>
    ): void => {
        evt.preventDefault();
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
