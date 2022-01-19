import './Input.css';

interface InputProps {
    element: string;
    id: string;
    type: string;
    placeholder?: string;
    rows?: number;
}

const Input: React.FC<InputProps> = ({
    element = 'input',
    id,
    type = 'text',
    placeholder,
    rows = 3
}) => {
    const elementType =
        element === 'input' ? (
            <input type={type} id={id} placeholder={placeholder} />
        ) : (
            <textarea id={id} rows={rows} />
        );

    return (
        <div className={`form-control`}>
            <label htmlFor={id}></label>
            {elementType}
        </div>
    );
};

export default Input;
