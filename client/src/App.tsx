import { useEffect } from 'react';

import MainNavigation from 'shared/components/navigation/MainNavigation';
import Router from 'router/Router';
import useAuth from 'hooks/use-auth';

/**
 * TODO we should have useEffect where we will logout user if token has expired
 *
 */

const App: React.FC = () => {
    const { onLogin } = useAuth();

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
            onLogin(
                storedUserData.userId,
                storedUserData.token,
                new Date(storedUserData.expiration)
            );
        }
    }, [onLogin]);

    // useEffect(() => {
    //     let logoutTimer;
    //     const remainingTime

    // }, [])

    return (
        <>
            <MainNavigation />
            <main>
                <Router />
            </main>
        </>
    );
};

export default App;
