import React, { useReducer, useEffect } from 'react';
import { inputInitState, inputReducer } from 'reducers/NewPlace';
import { Validators } from 'models/validators/validators';

import './Input.css';

interface InputProps {
    element: string;
    id: string;
    type?: string;
    placeholder?: string;
    rows?: number;
    errorText: string;
    label: string;
    validators: Validators[];
    onInputChange: (id: string, value: string, isValid: boolean) => void;
}

const Input: React.FC<InputProps> = ({
    element = 'input',
    id,
    type = 'text',
    placeholder,
    rows = 3,
    errorText,
    label,
    validators,
    onInputChange
}) => {
    const [inputState, dispatch] = useReducer(inputReducer, inputInitState);
    const { value, isValid } = inputState;

    const changeHandler: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (evt) => {
        dispatch({ type: 'CHANGE', value: evt.target.value, validators });
    };

    const touchHandler = () => {
        dispatch({ type: 'TOUCH', validators });
    };

    useEffect(() => {
        onInputChange(id, value, isValid);
    }, [id, onInputChange, value, isValid]);

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
