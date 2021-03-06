import { useReducer, useCallback } from 'react';

import { IFormState } from 'types/form/form';
import { formIsValid } from 'util/form-data';

enum ReducerActionType {
    INPUT_CHANGE = 'INPUT_CHANGE',
    SET_DATA = 'SET_DATA'
}

type ActionsType =
    | {
          type: ReducerActionType.INPUT_CHANGE;
          payload: { id: string; value: string | File; isValid: boolean };
      }
    | { type: ReducerActionType.SET_DATA; payload: { inputs: IFormState } };

const formReducer = (state: IFormState, action: ActionsType) => {
    let newState: IFormState;

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

            newState.formIsValid = formIsValid(newState.inputs);

            return newState;

        case ReducerActionType.SET_DATA:
            newState = {
                ...action.payload.inputs
            };

            newState.formIsValid = formIsValid(newState.inputs);

            return newState;
        default:
            throw new Error('Action Type is not valid');
    }
};

const useForm = (stateSchema: IFormState) => {
    const [state, dispatch] = useReducer(formReducer, stateSchema);

    const setFormData = useCallback((inputs: IFormState): void => {
        dispatch({ type: ReducerActionType.SET_DATA, payload: { inputs } });
    }, []);

    const inputChangeHandler = useCallback(
        (id: string, value: string | File, isValid: boolean): void => {
            dispatch({
                type: ReducerActionType.INPUT_CHANGE,
                payload: { id, value, isValid }
            });
        },
        []
    );

    return { state, inputChangeHandler, setFormData };
};

export default useForm;
