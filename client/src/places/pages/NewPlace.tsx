import Input from 'shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from 'shared/util/validatiors';

import './NewPlace.css';

const NewPlace = () => {
    return (
        <form className="place-form">
            <Input
                element="input"
                type="text"
                label="Title"
                errorText="Please eneter a valid title"
                id="title"
                validators={[VALIDATOR_REQUIRE()]}
            />
        </form>
    );
};

export default NewPlace;
