import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop: React.FC<{ onCloseDrawer: () => void }> = ({
    onCloseDrawer
}) => {
    return ReactDOM.createPortal(
        <div className="backdrop" onClick={onCloseDrawer}></div>,
        document.getElementById('backdrop-hook')!
    );
};

export default Backdrop;
