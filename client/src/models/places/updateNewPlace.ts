interface NewPlaceItem {
    value: string;
    isValid: boolean;
}

export interface NewUpdatePlaceState {
    inputs: {
        [key: string]: NewPlaceItem;
    };
    formIsValid: boolean;
}
