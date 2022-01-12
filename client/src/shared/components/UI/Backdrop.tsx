import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return ReactDOM.createPortal(
        <div className="backdrop" onClick={onClick}></div>,
        document.getElementById('backdrop-hook')!
    );
};

export default Backdrop;
