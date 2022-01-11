import './SideDrawer.css';

const SideDrawer: React.FC = ({ children }) => {
    return <aside className="side-drawer">{children}</aside>;
};

export default SideDrawer;
