import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

const SideDrawer: React.FC<{ show: boolean }> = ({ children, show }) => {
    const content = (
        <CSSTransition
            in={show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            <aside className="side-drawer">{children}</aside>
        </CSSTransition>
    );

    return ReactDOM.createPortal(
        content,
        document.getElementById('drawer-hook')!
    );
};

export default SideDrawer;
