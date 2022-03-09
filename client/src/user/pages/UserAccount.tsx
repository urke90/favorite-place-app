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
import Button from 'shared/components/FormElements/Button';

import './UserAccount.css';

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
    const { userId, token } = useAuth();
    const { isLoading, sendRequest, error, clearErrorHandler } = useAxios();
    const {
        state: userState,
        inputChangeHandler,
        setFormData
    } = useForm(userAccountState);

    const submitAccountDetails = async (
        evt: React.FormEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();
        console.log('account details submitted', userState);

        const { name, image } = userState.inputs;

        const data = new FormData();
        data.append('name', name.value);
        data.append('image', image.value);

        try {
            const response = await sendRequest({
                url: `/api/users/${userId}/update`,
                method: 'PATCH',
                data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (err) {}
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

                console.log('response fro getting user infor', response);

                setFormData({
                    inputs: {
                        name: {
                            value: response.data.user.name,
                            isValid: true
                        },
                        image: {
                            value: response.data.user.image,
                            isValid: false
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

    const { name, image } = userState.inputs;

    // image value should be object since it is file that should be uploaded. (:File)
    const btnIsDisabled = !name.isValid || typeof image.value !== 'object';

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
                                initValid={userState.inputs.name.isValid}
                            />
                            <ImagePicker
                                id="image"
                                onImageChange={inputChangeHandler}
                            />
                            <Button disabled={btnIsDisabled} type="submit">
                                UPDATE PROFILE
                            </Button>
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default UserAccount;
