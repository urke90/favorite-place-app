import { InputReducerState } from 'models/input/input';
import { Validators } from 'models/validators/validators';
import { validate } from 'shared/util/validatiors';

type ActionType =
    | { type: 'CHANGE'; value: string; validators: Validators[] }
    | { type: 'TOUCH'; value?: string; validators: Validators[] };

export const inputInitState: InputReducerState = {
    value: '',
    isValid: false,
    isTouched: false
};

export const inputReducer = (state: InputReducerState, action: ActionType) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
};
