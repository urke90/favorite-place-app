import { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * (value: React.SetStateAction<boolean>) => void; ---> pogledati slucaj kada imamo handler koji menja state, kako je najbolje uradit typescript za function
 */

interface AuthContext {
    isAuth: boolean;
    onLogin: () => void;
    onLogout: () => void;
}

const authState = {
    isAuth: false,
    onLogin: () => {},
    onLogout: () => {}
};

export const AuthContext = createContext<AuthContext>(authState);

const AuthContextProvider: React.FC = ({ children }) => {
    const [isAuth, setAuthMode] = useState(false);
    const navigate = useNavigate();

    const loginHandler = useCallback(() => {
        setAuthMode(true);
        navigate('/', { replace: true });
    }, []);

    const logoutHandler = useCallback(() => {
        setAuthMode(false);
        navigate('/auth', { replace: true });
    }, []);

    const value: AuthContext = {
        isAuth,
        onLogin: loginHandler,
        onLogout: logoutHandler
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
