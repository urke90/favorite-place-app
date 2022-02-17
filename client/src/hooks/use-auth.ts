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

    if (!auth) throw new Error('Error with Auth and AuthContext!');

    const { isLoggedIn, userId, onLogin, onLogout } = auth;

    return { isLoggedIn, userId, onLogin, onLogout };
};

export default useAuth;
