import { FormState } from 'models/form/form';

export interface ILoginData {
    password: string;
    email: string;
}
export interface ISignupData extends ILoginData {
    name: string;
}

export const authLoginState: FormState = {
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

export const authSignupState: FormState = {
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
