import './SideDrawer.css';
import ReactDOM from 'react-dom';

const SideDrawer: React.FC = ({ children }) => {
    const content = <aside className="side-drawer">{children}</aside>;

    return ReactDOM.createPortal(
        content,
        document.getElementById('drawer-hook')!
    );
};

export default SideDrawer;
