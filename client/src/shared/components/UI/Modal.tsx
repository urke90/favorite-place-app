import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

interface ModalOverlayProps {
    className?: string;
    headerClass?: string;
    header?: string;
    onFormSubmit?: () => void;
    contentClass?: string;
    footerClass?: string;
    footer?: React.ReactNode;
}

interface ModalProps extends ModalOverlayProps {
    showModal: boolean;
    onCloseModal: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({
    className,
    headerClass,
    header,
    onFormSubmit,
    contentClass,
    children,
    footerClass,
    footer
}) => {
    const content = (
        <div className={`modal ${className}`}>
            <header className={`modal__header ${headerClass}`}>
                <h2>{header}</h2>
            </header>
            <form
                onSubmit={
                    onFormSubmit
                        ? onFormSubmit
                        : (event) => event.preventDefault()
                }
            >
                <div className={`modal__content ${contentClass}`}>
                    {children}
                </div>
                <footer className={`modal__footer ${footerClass}`}>
                    {footer}
                </footer>
            </form>
        </div>
    );
    return ReactDOM.createPortal(
        content,
        document.getElementById('modal-hook')!
    );
};

const Modal: React.FC<ModalProps> = ({ showModal, onCloseModal, ...rest }) => {
    return (
        <>
            {showModal && <Backdrop onCloseModal={onCloseModal} />}
            <CSSTransition
                in={showModal}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <ModalOverlay {...rest} />
            </CSSTransition>
        </>
    );
};

export default Modal;
