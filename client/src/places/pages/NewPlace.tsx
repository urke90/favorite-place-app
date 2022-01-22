import { useReducer, useCallback } from 'react';

import Input from 'shared/components/FormElements/Input';
import Button from 'shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from 'shared/util/validatiors';

import './NewPlace.css';

type ActionType = {
    type: 'INPUT_CHANGE';
    id: string;
    value: string;
    isValid: boolean;
};

interface NewPlaceItem {
    value: string;
    isValid: boolean;
}

interface NewPlaceState {
    inputs: {
        [key: string]: NewPlaceItem;
    };

    formIsValid: boolean;
}

const newPlaceInitState: NewPlaceState = {
    inputs: {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    },
    formIsValid: false
};

const newPlaceReducer = (
    state: NewPlaceState,
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
            return state;
    }
};

const NewPlace = () => {
    const [newPlaceState, dispatch] = useReducer(
        newPlaceReducer,
        newPlaceInitState
    );

    const inputChangeHandler = useCallback(
        (id: string, value: string, isValid: boolean) => {
            dispatch({ type: 'INPUT_CHANGE', id, value, isValid });
        },
        []
    );

    return (
        <form className="place-form">
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                errorText="Please eneter a valid title"
                validators={[VALIDATOR_REQUIRE()]}
                onInputChange={inputChangeHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                errorText="Please eneter a valid description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInputChange={inputChangeHandler}
            />
            <Button disabled={!newPlaceState.formIsValid} type="submit">
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
