import React, { useReducer, useEffect } from 'react';
import { inputReducer, InputAction } from 'reducers/input';
import { IValidators } from 'types/validators/validators';

import './Input.css';

interface IInput {
    element: string;
    id: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    rows?: number;
    errorText: string;
    label: string;
    validators: IValidators[];
    onInputChange: (id: string, value: string, isValid: boolean) => void;
    initValue?: string;
    initValid?: boolean;
}

const Input: React.FC<IInput> = ({
    element = 'input',
    id,
    type = 'text',
    placeholder,
    rows = 3,
    errorText,
    label,
    validators,
    onInputChange,
    initValue,
    initValid
}) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initValue || '',
        isValid: initValid || false,
        isTouched: false
    });
    const { value, isValid, isTouched } = inputState;

    const changeHandler: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (evt) => {
        dispatch({
            type: InputAction.CHANGE,
            value: evt.target.value,
            validators
        });
    };

    const touchHandler = () => {
        dispatch({ type: InputAction.TOUCH, validators });
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
                value={initValue || value}
                onChange={changeHandler}
                onBlur={touchHandler}
            />
        ) : (
            <textarea
                id={id}
                rows={rows}
                onChange={changeHandler}
                value={initValue || value}
                onBlur={touchHandler}
            />
        );

    return (
        <div
            className={`form-control ${
                !isValid && isTouched && 'form-control--invalid'
            }`}
        >
            <label htmlFor={id}>{label}</label>
            {elementType}
            {!isValid && isTouched && <p>{errorText}</p>}
        </div>
    );
};

export default Input;
