import { Navigate } from 'react-router-dom';
import useAuth from 'hooks/use-auth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
