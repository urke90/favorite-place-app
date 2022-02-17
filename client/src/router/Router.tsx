import { Routes, Route, Navigate } from 'react-router-dom';

import Places from 'places/pages/UserPlaces';
import UpdatePlace from 'places/pages/UpdatePlace';
import Users from 'user/pages/Users';
import NewPlace from 'places/pages/NewPlace';
import Auth from 'auth/Auth';
import PrivateRoute from './PrivateRoute';

interface RoutesProps {}

const Router: React.FC<RoutesProps> = () => {
    return (
        <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/:userId/places" element={<Places />} />
            <Route
                path="/places/new"
                element={
                    <PrivateRoute>
                        <NewPlace />
                    </PrivateRoute>
                }
            />
            <Route path="/places/:placeId" element={<UpdatePlace />} />
            <Route path="/auth" element={<Auth />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
    );
};

export default Router;
