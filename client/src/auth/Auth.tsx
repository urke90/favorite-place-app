import { useEffect } from 'react';
import axios from 'axios';

import useForm from 'hooks/use-form';
import useToggle from 'hooks/use-toggle';
import useAuth from 'hooks/use-auth';
import { FormState } from 'models/form/form';
import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from 'util/validatiors';

import './Auth.css';

/**
 * figure out logic for login and signup handler
 *  ************* or the same function can be used for both but handle this on BE?!?!?!?
 */

interface ILoginData {
    password: string;
    email: string;
}
interface ISignupData extends ILoginData {
    name: string;
}

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

    const { onLogin } = useAuth();

    const authSubmitHandler = async (
        evt: React.FormEvent<HTMLFormElement>
    ): Promise<any> => {
        evt.preventDefault();

        const { name, email, password } = authState.inputs;
        let baseUrl = '/api/users';
        let url = baseUrl + '/login';

        let data: ISignupData | ILoginData = {
            email: email.value,
            password: password.value
        };

        if (!isLoginMode) {
            url = baseUrl + '/signup';
            data = {
                name: name.value,
                email: email.value,
                password: password.value
            };
        }

        try {
            const response = await axios.post(url, data);
            console.log('response', response);
            if (response.status !== 201) {
                throw new Error(
                    'Something went wrong. Please try again later.'
                );
            }
        } catch (err) {
            console.log('err', err);
        }
    };

    useEffect(() => {
        if (isLoginMode) {
            return setAuthFormData(authLoginState);
        }
        setAuthFormData(authSignupState);
    }, [isLoginMode]);

    return (
        <form className="auth-form" onSubmit={authSubmitHandler}>
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
