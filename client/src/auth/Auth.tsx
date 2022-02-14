import { useEffect, useState } from 'react';
import axios from 'axios';

import useForm from 'hooks/use-form';
import useToggle from 'hooks/use-toggle';
import useAuth from 'hooks/use-auth';
import { FormState } from 'models/form/form';
import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import Modal from 'shared/components/UI/Modals/Modal';
import LoadingSpinner from 'shared/components/UI/LoadingSpinner';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from 'util/validatiors';

import './Auth.css';

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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

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
        // let url = baseUrl + '/login';
        let url = `${baseUrl}/${isLoginMode ? 'login' : 'signup'} `;

        let data: ISignupData | ILoginData = {
            email: email.value,
            password: password.value
        };

        if (!isLoginMode) {
            data = {
                name: name.value,
                email: email.value,
                password: password.value
            };
        }

        try {
            setIsLoading(true);
            const response = await axios.post(url, data);
            console.log('responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', response);

            if (response.status !== 201) {
                throw new Error("Can't create new user");
            }
            // CONTINUE HERE
        } catch (err: any) {
            setError(
                err.message || 'Something went wrong, please try again later!'
            );
        }
        setIsLoading(false);
    };

    const closeErrorModal = () => setError(null);

    useEffect(() => {
        if (isLoginMode) {
            return setAuthFormData(authLoginState);
        }
        setAuthFormData(authSignupState);
    }, [isLoginMode]);

    return (
        <>
            <Modal
                showModal={!!error}
                onCloseModal={closeErrorModal}
                header="Error occured!"
                footer={<Button onClick={closeErrorModal}>CLOSE</Button>}
            >
                <p>{error && error}</p>
            </Modal>
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
