import { useContext } from 'react';

import { AuthContext } from 'context/AuthContext';

/**
 * videti sa nesicem best practice za useAuth
 * konkretno:
 * return type of the function
 *
 * */

const useAuth = (): {
    isLoggedIn: boolean;
    userId: string | null;
    onLogin: (userId: string) => void;
    onLogout: () => void;
} => {
    const auth = useContext(AuthContext);

    if (!auth) throw new Error('Error with Auth and AuthContext!');

    return auth;
};

export default useAuth;
