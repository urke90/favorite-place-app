import { useContext } from 'react';

import { AuthContext } from 'context/AuthContext';
import { IAuthContext } from 'context/AuthContext';

const useAuth = (): IAuthContext => {
    const auth = useContext(AuthContext);

    if (!auth) throw new Error('Error with Auth and AuthContext!');

    return auth;
};

export default useAuth;
