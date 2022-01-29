import { useContext } from 'react';
import AuthContextProvider, { AuthContext } from 'context/AuthContext';

import { Routes, Route, Navigate } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from 'shared/components/navigation/MainNavigation';
import Places from 'places/pages/Places';
import UpdatePlace from 'places/pages/UpdatePlace';
import Auth from 'auth/Auth';

const App: React.FC = () => {
    const authCtx = useContext(AuthContext);

    console.log('authCtx', authCtx);

    return (
        <AuthContextProvider>
            <MainNavigation />
            <main>
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="/:userId/places" element={<Places />} />
                    <Route path="/places/new" element={<NewPlace />} />
                    <Route path="/places/:placeId" element={<UpdatePlace />} />
                    <Route path="/auth" element={<Auth />} />
                    {/* <Route path="*" element={<Navigate to="/" />} /> */}
                </Routes>
            </main>
        </AuthContextProvider>
    );
};

export default App;
