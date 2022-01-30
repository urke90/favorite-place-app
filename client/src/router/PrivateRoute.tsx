import { Navigate, Outlet } from 'react-router-dom';
import useAuth from 'hooks/use-auth';
import React from 'react';

type PrivateRouteProps = {
    children: React.ReactElement<any, any> | null;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
