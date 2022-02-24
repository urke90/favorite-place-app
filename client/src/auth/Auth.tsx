import { useEffect } from 'react';

import useForm from 'hooks/use-form';
import useToggle from 'hooks/use-toggle';
import useAuth from 'hooks/use-auth';
import useAxios from 'hooks/use-axios';
import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import ErrorModal from 'shared/components/UI/Modals/ErrorModal';
import LoadingSpinner from 'shared/components/UI/LoadingSpinner';
import {
    authLoginState,
    authSignupState,
    ILoginData,
    ISignupData
} from './auth';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from 'util/validatiors';

import './Auth.css';

const Auth: React.FC = () => {
    const { isLoading, error, sendRequest, clearErrorHandler } = useAxios();

    const [isLoginMode, toggleLoginMode] = useToggle(true);

    const [authState, inputChangeHandler, setAuthFormData] =
        useForm(authLoginState);

    const { onLogin } = useAuth();

    const authSubmitHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
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
            const response = await sendRequest({ url, method: 'POST', data });

            if (!response) {
                throw new Error('Something went wrong, try again later');
            }

            console.log('response when auth', response);

            onLogin(response.data.userId, response.data.token);
        } catch (err) {}
    };

    useEffect(() => {
        if (isLoginMode) {
            return setAuthFormData(authLoginState);
        }
        setAuthFormData(authSignupState);
    }, [isLoginMode]);

    return (
        <>
            <ErrorModal error={error} onCloseModal={clearErrorHandler} />
            <form className="auth-form" onSubmit={authSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
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
        </>
    );
};

export default Auth;
