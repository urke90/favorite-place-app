import { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UI/Backdrop';
import './MainNavigation.css';

const MainNavigation: React.FC = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

    const openDrawerHandler = () => setDrawerIsOpen(true);

    const closeDrawerHandler = () => setDrawerIsOpen(false);

    return (
        <>
            {drawerIsOpen && <Backdrop onCloseModal={closeDrawerHandler} />}

            <SideDrawer show={drawerIsOpen} onCloseDrawer={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>

            <MainHeader>
                <button
                    className="main-navigation__menu-btn"
                    onClick={openDrawerHandler}
                >
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">YourPlaces</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    );
};

export default MainNavigation;
