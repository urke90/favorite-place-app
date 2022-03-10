import { useNavigate } from 'react-router-dom';

import useForm from 'hooks/use-form';
import useAxios from 'hooks/use-axios';
import useAuth from 'hooks/use-auth';
import { IFormState } from 'types/form/form';
import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import ErrorModal from 'shared/components/UI/Modals/ErrorModal';
import LoadingSpinner from 'shared/components/UI/LoadingSpinner';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from 'util/validatiors';
import ImagePicker from 'shared/components/FormElements/ImagePicker';

import './PlaceForm.css';

// Define state in component since usePlaceForm needs to be passed state.
const newPlaceInitState: IFormState = {
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
        },
        image: {
            value: '',
            isValid: false
        }
    },
    formIsValid: false
};

const NewPlace: React.FC = () => {
    const { userId, token } = useAuth();
    const { isLoading, error, clearErrorHandler, sendRequest } = useAxios();
    const { state: newPlaceState, inputChangeHandler } =
        useForm(newPlaceInitState);
    const navigate = useNavigate();

    const newPlaceSubmitHandler = async (
        evt: React.FormEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();

        const { address, description, title, image } = newPlaceState.inputs;

        try {
            const formData = new FormData();
            formData.append('title', title.value);
            formData.append('description', description.value);
            formData.append('address', address.value);
            formData.append('image', image.value);

            const response = await sendRequest({
                url: '/api/places',
                method: 'POST',
                data: formData,
                headers: { Authorization: 'Bearer ' + token }
            });

            if (!response || response.status !== 201) {
                throw new Error(
                    'Something went wrong, could not create new place'
                );
            }

            navigate('/');
        } catch (err) {}
    };

    return (
        <>
            <ErrorModal error={error} onCloseModal={clearErrorHandler} />
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
                <ImagePicker id="image" onImageChange={inputChangeHandler} />
                <Button disabled={!newPlaceState.formIsValid} type="submit">
                    ADD PLACE
                </Button>
            </form>
        </>
    );
};

export default NewPlace;
