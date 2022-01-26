import usePlaceForm from 'hooks/use-form';
import { NewUpdatePlaceState } from 'models/places/updateNewPlace';
import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from 'util/validatiors';

import './Auth.css';

const authState: NewUpdatePlaceState = {
    inputs: {
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    },
    formIsValid: true
};

const Auth: React.FC = () => {
    const [authFormState, inputChangeHandler] = usePlaceForm(authState);

    const submitHandler = (evt: React.FormEvent<HTMLFormElement>): void => {
        evt.preventDefault();
        console.log('authFormState', authFormState);
    };

    return (
        <form className="auth-form" onSubmit={submitHandler}>
            <Input
                id="email"
                label="Email"
                element="input"
                type="text"
                placeholder="Email"
                errorText="Email is not valid. Please enter valid email"
                validators={[VALIDATOR_EMAIL()]}
                onInputChange={inputChangeHandler}
            />
            <Input
                id="password"
                label="Password"
                element="input"
                type="password"
                placeholder="Password"
                errorText="Please enter valid password (6 characters long)"
                validators={[VALIDATOR_MINLENGTH(6)]}
                onInputChange={inputChangeHandler}
            />
            <Button disabled={!authFormState.formIsValid} type="submit">
                LOGIN/SIGNUP
            </Button>
        </form>
    );
};

export default Auth;
