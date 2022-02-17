import { useNavigate } from 'react-router-dom';

import useForm from 'hooks/use-form';
import useAxios from 'hooks/use-axios';
import useAuth from 'hooks/use-auth';
import { FormState } from 'models/form/form';
import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import Modal from 'shared/components/UI/Modals/Modal';
import LoadingSpinner from 'shared/components/UI/LoadingSpinner';
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
    const { userId } = useAuth();
    const { isLoading, error, clearErrorHandler, sendRequest } = useAxios();
    const [newPlaceState, inputChangeHandler] = useForm(newPlaceInitState);
    const navigate = useNavigate();

    const newPlaceSubmitHandler = async (
        evt: React.FormEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();

        /**
         * TODO in the data we send later we should provide imageUrl ===   users will upload img!!!
         */

        const { address, description, title } = newPlaceState.inputs;
        const newPlaceData = {
            title: title.value,
            description: description.value,
            address: address.value,
            creatorId: userId
        };

        try {
            const response = await sendRequest(
                '/api/places',
                'POST',
                newPlaceData
            );
            navigate('/', { replace: true });
        } catch (err) {}
    };

    return (
        <>
            <form className="place-form" onSubmit={newPlaceSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
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
        </>
    );
};

export default NewPlace;
