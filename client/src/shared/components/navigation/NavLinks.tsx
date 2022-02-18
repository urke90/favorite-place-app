import { NavLink } from 'react-router-dom';

import useAuth from 'hooks/use-auth';
import Button from '../FormElements/Button';

import './NavLinks.css';

const NavLinks: React.FC = () => {
    const { userId, isLoggedIn, onLogout } = useAuth();

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/">ALL USERS</NavLink>
            </li>
            {isLoggedIn && (
                <li>
                    <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
                </li>
            )}
            {isLoggedIn && (
                <li>
                    <NavLink to="/places/new">ADD PLACE</NavLink>
                </li>
            )}
            {!isLoggedIn && (
                <li>
                    <NavLink to="/auth">AUTHENTICATE</NavLink>
                </li>
            )}
            {isLoggedIn && (
                <li>
                    <Button onClick={onLogout}>LOGOUT</Button>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
