import { IValidators } from 'types/validators/validators';
import { validate } from 'util/validatiors';

interface IInputReducerState {
    value: string;
    isValid: boolean;
    isTouched: boolean;
}

export enum InputAction {
    CHANGE = 'CHANGE',
    TOUCH = 'TOUCH'
}

type Action =
    | { type: InputAction.CHANGE; value: string; validators: IValidators[] }
    | { type: InputAction.TOUCH; value?: string; validators: IValidators[] };

export const inputReducer = (state: IInputReducerState, action: Action) => {
    switch (action.type) {
        case InputAction.CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators)
            };
        case InputAction.TOUCH:
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
};
