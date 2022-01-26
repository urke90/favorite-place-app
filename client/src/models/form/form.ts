interface FormItem {
    value: string;
    isValid: boolean;
}

export interface FormState {
    inputs: {
        [key: string]: FormItem;
    };
    formIsValid: boolean;
}
