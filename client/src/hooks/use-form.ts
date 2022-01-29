import { useReducer, useCallback } from 'react';

import { FormState } from 'models/form/form';

enum ReducerActionType {
    INPUT_CHANGE = 'INPUT_CHANGE',
    SET_DATA = 'SET_DATA'
}

type ActionsType =
    | {
          type: ReducerActionType.INPUT_CHANGE;
          payload: { id: string; value: string; isValid: boolean };
      }
    | { type: ReducerActionType.SET_DATA; payload: { inputs: FormState } };

const placeFormReducer = (state: FormState, action: ActionsType) => {
    let newState: FormState;

    switch (action.type) {
        case ReducerActionType.INPUT_CHANGE:
            newState = {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.payload.id]: {
                        value: action.payload.value,
                        isValid: action.payload.isValid
                    }
                }
            };

            newState.formIsValid = !Object.values(newState.inputs).some(
                (input) => input.isValid === false
            );

            return newState;

        case ReducerActionType.SET_DATA:
            newState = {
                ...action.payload.inputs
            };

            newState.formIsValid = !Object.values(newState.inputs).some(
                (input) => input.isValid === false
            );

            return newState;
        default:
            throw new Error('Action Type is not valid');
    }
};

const useForm = (
    stateSchema: FormState
): [
    FormState,
    (id: string, value: string, isValid: boolean) => void,
    (inputs: FormState) => void
] => {
    const [placeState, dispatch] = useReducer(placeFormReducer, stateSchema);

    const inputChangeHandler = useCallback(
        (id: string, value: string, isValid: boolean): void => {
            dispatch({
                type: ReducerActionType.INPUT_CHANGE,
                payload: { id, value, isValid }
            });
        },
        []
    );

    const setFormData = useCallback((inputs: FormState): void => {
        dispatch({ type: ReducerActionType.SET_DATA, payload: { inputs } });
    }, []);

    return [placeState, inputChangeHandler, setFormData];
};

export default useForm;
