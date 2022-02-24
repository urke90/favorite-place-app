import { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * (value: React.SetStateAction<boolean>) => void; ---> pogledati slucaj kada imamo handler koji menja state, kako je najbolje uradit typescript za function
 */

interface IAuthContext {
    isLoggedIn: boolean;
    token: string | null;
    userId: string | null;
    onLogin: (userId: string, token: string) => void;
    onLogout: () => void;
}

const authState = {
    isLoggedIn: false,
    userId: null,
    token: null,
    onLogin: () => {},
    onLogout: () => {}
};

export const AuthContext = createContext<IAuthContext>(authState);

const AuthContextProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    const loginHandler = useCallback((userId: string, token: string) => {
        setToken(token);
        setUserId(userId);
        navigate('/', { replace: true });
    }, []);

    const logoutHandler = useCallback(() => {
        setToken(null);
        setUserId(null);
        navigate('/auth', { replace: true });
    }, []);

    const value: IAuthContext = {
        isLoggedIn: !!token,
        token,
        userId,
        onLogin: loginHandler,
        onLogout: logoutHandler
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
