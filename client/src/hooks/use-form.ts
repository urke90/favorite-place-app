import { useReducer, useCallback } from 'react';

import { NewUpdatePlaceState } from '../models/places/updateNewPlace';

type ActionType = {
    type: 'INPUT_CHANGE';
    id: string;
    value: string;
    isValid: boolean;
};

const placeFormReducer = (
    state: NewUpdatePlaceState,
    { type, id, value, isValid }: ActionType
) => {
    console.log('state in use-form', state);

    switch (type) {
        case 'INPUT_CHANGE':
            const newState = {
                ...state,
                inputs: {
                    ...state.inputs,
                    [id]: {
                        value,
                        isValid
                    }
                }
            };

            newState.formIsValid = !Object.values(newState.inputs).some(
                (input) => input.isValid === false
            );

            return {
                ...newState
            };
        default:
            return state;
    }
};

const usePlaceForm = (stateSchema: NewUpdatePlaceState) => {
    const [newPlaceState, dispatch] = useReducer(placeFormReducer, stateSchema);

    const inputChangeHandler = useCallback(
        (id: string, value: string, isValid: boolean) => {
            dispatch({ type: 'INPUT_CHANGE', id, value, isValid });
        },
        []
    );

    return [newPlaceState, inputChangeHandler] as const;
};

export default usePlaceForm;
