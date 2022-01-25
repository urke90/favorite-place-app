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
            throw new Error('Action Type is not valid');
    }
};

const usePlaceForm = (stateSchema: NewUpdatePlaceState) => {
    const [placeState, dispatch] = useReducer(placeFormReducer, stateSchema);

    const inputChangeHandler = useCallback(
        (id: string, value: string, isValid: boolean) => {
            dispatch({ type: 'INPUT_CHANGE', id, value, isValid });
        },
        []
    );

    return [placeState, inputChangeHandler] as const;
};

export default usePlaceForm;
