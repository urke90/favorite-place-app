interface IFormItem {
    value: any;
    isValid: boolean;
}

export interface IFormState {
    inputs: {
        [key: string]: IFormItem;
    };
    formIsValid: boolean;
}
