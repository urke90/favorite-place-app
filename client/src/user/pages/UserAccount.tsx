import { useEffect, useState } from 'react';

import Card from 'shared/components/UI/Card';
import Input from 'shared/components/FormElements/Input';
import ImagePicker from 'shared/components/FormElements/ImagePicker';
import { VALIDATOR_REQUIRE } from 'util/validatiors';
import useAxios from 'hooks/use-axios';
import useAuth from 'hooks/use-auth';
import useForm from 'hooks/use-form';
import { IUser } from 'types/user/user';
import { IFormState } from 'types/form/form';

import LoadingSpinner from 'shared/components/UI/LoadingSpinner';
import ErrorModal from 'shared/components/UI/Modals/ErrorModal';
import Avatar from 'shared/components/UI/Avatar';
import './UserAccount.css';
import Button from 'shared/components/FormElements/Button';

/**
 * 1. Get the userId from the url
 * 2. send get request to get the current user
 * 3. we will need:
 *      - user image
 *      - user name
 *      - reset pw  =====> Check if this can be done  in the same form ?!?!?!?!?!?
 *  ? maybe we could later have some recent chat messages or recent contacts???
 */

const userAccountState: IFormState = {
    inputs: {
        name: {
            value: '',
            isValid: false
        },
        image: {
            value: '',
            isValid: false
        }
    },
    formIsValid: false
};

const UserAccount: React.FC = () => {
    const [user, setUser] = useState<IUser>();
    const { userId } = useAuth();
    const { isLoading, sendRequest, error, clearErrorHandler } = useAxios();
    const [userState, inputChangeHandler, setFormData] =
        useForm(userAccountState);

    // console.log('userState', userState);

    const submitAccountDetails = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        console.log('account details submitted');
    };

    useEffect(() => {
        const getAccountDetails = async () => {
            try {
                const response = await sendRequest({
                    url: `/api/users/${userId}`,
                    method: 'GET'
                });

                if (!response || response.status !== 200) {
                    return;
                }

                setFormData({
                    inputs: {
                        name: {
                            value: response.data.user.name,
                            isValid: true
                        },
                        image: {
                            value: response.data.user.image,
                            isValid: true
                        }
                    },
                    formIsValid: true
                });

                setUser(response.data.user);
                // console.log('response from account details', response);
            } catch (err) {}
        };

        getAccountDetails();
    }, []);

    if (!user) {
        return (
            <div>
                <Card>
                    <h2>User not found!</h2>
                </Card>
            </div>
        );
    }

    return (
        <div className="user-profile">
            <ErrorModal onCloseModal={clearErrorHandler} error={error} />
            <Card>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2 className="center">Hello {user.name}</h2>
                <div className="user__details">
                    <div className="user__img">
                        <h3 className="center">Current Avatar</h3>
                        <Avatar
                            image={user.image}
                            alt={user.name}
                            width={200}
                        />
                    </div>
                    <div className="user__info">
                        <h3>Update your profile?</h3>
                        <form onSubmit={submitAccountDetails}>
                            <Input
                                element="input"
                                id="name"
                                type="text"
                                label="Your Name"
                                errorText="Please enter name"
                                validators={[VALIDATOR_REQUIRE()]}
                                onInputChange={inputChangeHandler}
                                initValue={userState.inputs.name.value}
                            />
                            <ImagePicker id="image" onImageChange={() => {}} />
                            <Button type="submit">UPDATE PROFILE</Button>
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default UserAccount;
