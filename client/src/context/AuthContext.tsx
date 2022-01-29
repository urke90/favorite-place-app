import { createContext, useCallback } from 'react';
import useToggle from 'hooks/use-toggle';

interface AuthContext {
    isAuth: boolean;
    login: () => void;
    logout: () => void;
}

const authState = {
    isAuth: false,
    login: () => {},
    logout: () => {}
};

export const AuthContext = createContext<AuthContext>(authState);

const AuthContextProvider: React.FC = ({ children }) => {
    const [isAuth, toggleAuthMode] = useToggle(false);

    const loginHandler = useCallback(() => toggleAuthMode(), []);

    const logoutHandler = useCallback(() => toggleAuthMode(), []);

    const value: AuthContext = {
        isAuth,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
