import Card from 'shared/components/UI/Card';
import Input from 'shared/components/FormElements/Input';
import ImagePicker from 'shared/components/FormElements/ImagePicker';
import { VALIDATOR_MINLENGTH } from 'util/validatiors';

import './UserAccount.css';
/**
 * 1. Get the userId from the url
 * 2. send get request to get the current user
 * 3. we will need:
 *      - user image
 *      - user name
 *      - reset pw  =====> Check if this can be done  in the same form ?!?!?!?!?!?
 *  ? maybe we could later have some recent chat messages or recent contacts???
 */

const DUMMY_USER = {
    id: 'u2',
    name: 'Nemanja Bjelica',
    image: 'https://ocdn.eu/pulscms-transforms/1/UmcktkqTURBXy83NDM0NzJlNDdjYzYyM2U1MWMyYTJhNGRjZjBkMmM5ZC5qcGVnkZMFzQJCzQGB',
    places: 5
};

const UserAccount = () => {
    return (
        <div className="user-profile">
            <Card>
                <h2 className="center">Hello {DUMMY_USER.name}</h2>
                <div className="user__details">
                    <div className="user__img">
                        <h3>Current Avatar</h3>
                        <img src={DUMMY_USER.image} alt="Avatar image" />
                    </div>
                    <div className="user__info">
                        <h3>Update your profile?</h3>
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Your Name"
                            errorText=""
                            validators={[VALIDATOR_MINLENGTH(3)]}
                            onInputChange={() => {}}
                        />
                        {/* <Input
                            element="input"
                            id="password"
                            type="password"
                            label="Password"
                            errorText=""
                            validators={[VALIDATOR_MINLENGTH(3)]}
                            onInputChange={() => {}}
                        />
                        <Input
                            element="input"
                            id="reset_password"
                            type="password"
                            label="Confirm Password"
                            errorText=""
                            validators={[VALIDATOR_MINLENGTH(3)]}
                            onInputChange={() => {}}
                        /> */}

                        <ImagePicker />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default UserAccount;
