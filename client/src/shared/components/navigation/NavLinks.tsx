import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import Button from '../FormElements/Button';

import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks: React.FC = () => {
    const { isLoggedIn, onLogout } = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/">ALL USERS</NavLink>
            </li>
            {isLoggedIn && (
                <li>
                    <NavLink to="/u1/places">MY PLACES</NavLink>
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
