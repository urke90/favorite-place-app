import { useEffect } from 'react';

import useForm from 'hooks/use-form';
import useToggle from 'hooks/use-toggle';
import { FormState } from 'models/form/form';
import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from 'util/validatiors';

import './Auth.css';

const authLoginState: FormState = {
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
    formIsValid: false
};

const authSignupState: FormState = {
    inputs: {
        name: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    },
    formIsValid: false
};

const Auth: React.FC = () => {
    const [isLoginMode, toggleLoginMode] = useToggle(true);

    const [authState, inputChangeHandler, setAuthFormData] =
        useForm(authLoginState);

    const submitHandler = (evt: React.FormEvent<HTMLFormElement>): void => {
        evt.preventDefault();
    };

    useEffect(() => {
        if (isLoginMode) {
            return setAuthFormData(authLoginState);
        }
        setAuthFormData(authSignupState);
    }, [isLoginMode]);

    return (
        <form className="auth-form" onSubmit={submitHandler}>
            {!isLoginMode && (
                <Input
                    id="name"
                    label="Name"
                    element="input"
                    type="text"
                    placeholder="User name"
                    errorText="Please enter name"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInputChange={inputChangeHandler}
                />
            )}
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
            <div className="center column">
                <Button disabled={!authState.formIsValid} type="submit">
                    {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                </Button>
                <br />
                <Button inverse onClick={toggleLoginMode} type="button">
                    SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
                </Button>
            </div>
        </form>
    );
};

export default Auth;
