import Modal from './Modal';
import Button from 'shared/components/FormElements/Button';

interface IErrorModal {
    error: string | null | undefined;
    onCloseModal: () => void;
}

const ErrorModal: React.FC<IErrorModal> = ({ onCloseModal, error }) => {
    return (
        <Modal
            onCloseModal={onCloseModal}
            header="An Error Occurred!"
            showModal={!!error}
            footer={<Button onClick={onCloseModal}>Okay</Button>}
        >
            <p>{error}</p>
        </Modal>
    );
};

export default ErrorModal;
