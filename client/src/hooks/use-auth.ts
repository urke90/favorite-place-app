import { useContext } from 'react';

import { AuthContext } from 'context/AuthContext';
import { IAuthContext } from 'context/AuthContext';

/**
 * videti sa nesicem best practice za useAuth
 * konkretno:
 * return type of the function
 *
 * */

const useAuth = (): IAuthContext => {
    const auth = useContext(AuthContext);

    if (!auth) throw new Error('Error with Auth and AuthContext!');

    return auth;
};

export default useAuth;
