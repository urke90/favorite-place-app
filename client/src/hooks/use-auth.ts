import { useContext } from 'react';

import { AuthContext } from 'context/AuthContext';

/**
 * videti sa nesicem best practice za useAuth
 * konkretno:
 * return type of the function
 *
 * */

const useAuth = () => {
    const auth = useContext(AuthContext);
    console.log('auth', auth);

    if (!auth) throw new Error('Error with Auth and AuthContext!');

    return auth;
};

export default useAuth;
