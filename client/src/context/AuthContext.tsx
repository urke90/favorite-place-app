import { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * (value: React.SetStateAction<boolean>) => void; ---> pogledati slucaj kada imamo handler koji menja state, kako je najbolje uradit typescript za function
 */

interface IAuthContext {
    isLoggedIn: boolean;
    userId: string | null;
    onLogin: (userId: string) => void;
    onLogout: () => void;
}

const authState = {
    isLoggedIn: false,
    userId: null,
    onLogin: (userId: string) => {},
    onLogout: () => {}
};

export const AuthContext = createContext<IAuthContext>(authState);

const AuthContextProvider: React.FC = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    const loginHandler = useCallback((userId: string) => {
        setIsLoggedIn(true);
        setUserId(userId);
        navigate('/', { replace: true });
    }, []);

    const logoutHandler = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
        navigate('/auth', { replace: true });
    }, []);

    const value: IAuthContext = {
        isLoggedIn,
        userId,
        onLogin: loginHandler,
        onLogout: logoutHandler
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
