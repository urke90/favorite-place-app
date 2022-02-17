interface IFormItem {
    value: string;
    isValid: boolean;
}

export interface IFormState {
    inputs: {
        [key: string]: IFormItem;
    };
    formIsValid: boolean;
}
