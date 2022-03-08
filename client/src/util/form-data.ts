import { IFormState } from 'types/form/form';

interface IFormInputsToValidate {
    [key: string]: {
        value: any;
        isValid: boolean;
    };
}

export const formIsValid = (inputsToValidate: IFormInputsToValidate) => {
    return Object.values(inputsToValidate).every(
        (input) => input.isValid === true
    );
};
