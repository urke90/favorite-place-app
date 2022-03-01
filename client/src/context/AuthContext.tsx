import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * (value: React.SetStateAction<boolean>) => void; ---> pogledati slucaj kada imamo handler koji menja state, kako je najbolje uradit typescript za function
 */

export interface IAuthContext {
    isLoggedIn: boolean;
    token: string | null;
    userId: string | null;
    onLogin: (userId: string, token: string, expirationDate?: Date) => void;
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

let logoutTimer: any;

const AuthContextProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [tokenExpirationTime, setTokenExpirationTime] = useState<Date | null>(
        null
    );
    const [userId, setUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    const loginHandler = useCallback(
        (userId: string, token: string, expirationDate?: Date) => {
            setToken(token);
            setUserId(userId);

            // Token expires in 1h ===> 1000ms * 60 * 60
            const tokenExpirationDate =
                expirationDate ||
                new Date(new Date().getTime() + 1000 * 60 * 60);

            setTokenExpirationTime(tokenExpirationDate);

            localStorage.setItem(
                'userData',
                JSON.stringify({
                    userId,
                    token,
                    expiration: tokenExpirationDate.toISOString()
                })
            );

            navigate('/', { replace: true });
        },
        []
    );

    const logoutHandler = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData');
        setTokenExpirationTime(null);
        navigate('/auth', { replace: true });
    }, []);

    // logout user if token expires
    useEffect(() => {
        if (token && tokenExpirationTime) {
            const remainingTime =
                tokenExpirationTime.getTime() - new Date().getTime();

            logoutTimer = setTimeout(logoutHandler, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, tokenExpirationTime, logoutHandler]);

    // Will auto login user if token hasn't expired yet
    useEffect(() => {
        const storedUserData = JSON.parse(
            localStorage.getItem('userData') || '{}'
        );

        if (
            storedUserData &&
            storedUserData.token &&
            new Date(storedUserData.expiration) > new Date()
        ) {
            loginHandler(
                storedUserData.userId,
                storedUserData.token,
                new Date(storedUserData.expiration)
            );
        }
    }, [loginHandler]);

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
