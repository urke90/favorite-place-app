import React, { useReducer } from 'react';

import { validate } from 'shared/util/validatiors';

import './Input.css';

type ActionType =
    | { type: 'CHANGE'; value: string; validators: Validators[] }
    | { type: 'TOUCH'; value?: string; validators: Validators[] };

interface InputState {
    value: string;
    isValid: boolean;
    isTouched: boolean;
}

interface Validators {
    type: string;
    value?: string;
}

const inputInitState: InputState = {
    value: '',
    isValid: false,
    isTouched: false
};

const inputReducer = (state: InputState, action: ActionType) => {
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

interface InputProps {
    element: string;
    id: string;
    type: string;
    placeholder?: string;
    rows?: number;
    errorText: string;
    label: string;
    validators: Validators[];
}

const Input: React.FC<InputProps> = ({
    element = 'input',
    id,
    type = 'text',
    placeholder,
    rows = 3,
    errorText,
    label,
    validators
}) => {
    const [inputState, dispatch] = useReducer(inputReducer, inputInitState);

    const changeHandler: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (evt) => {
        dispatch({ type: 'CHANGE', value: evt.target.value, validators });
    };

    const touchHandler = () => {
        dispatch({ type: 'TOUCH', validators });
    };

    const elementType =
        element === 'input' ? (
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={inputState.value}
                onChange={changeHandler}
                onBlur={touchHandler}
            />
        ) : (
            <textarea
                id={id}
                rows={rows}
                onChange={changeHandler}
                value={inputState.value}
                onBlur={touchHandler}
            />
        );

    return (
        <div
            className={`form-control ${
                !inputState.isValid &&
                inputState.isTouched &&
                'form-control--invalid'
            }`}
        >
            <label htmlFor={id}>{label}</label>
            {elementType}
            {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
        </div>
    );
};

export default Input;
