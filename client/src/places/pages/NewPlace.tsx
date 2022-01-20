import Input from 'shared/components/FormElements/Input';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from 'shared/util/validatiors';

import './NewPlace.css';

const NewPlace = () => {
    const inputChangeHandler = () => {
        console.log('inputChangeHandler');
    };

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
        </form>
    );
};

export default NewPlace;
