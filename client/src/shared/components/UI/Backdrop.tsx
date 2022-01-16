import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop: React.FC<{ onCloseModal: () => void }> = ({ onCloseModal }) => {
    return ReactDOM.createPortal(
        <div className="backdrop" onClick={onCloseModal}></div>,
        document.getElementById('backdrop-hook')!
    );
};

export default Backdrop;
