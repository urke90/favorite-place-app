import { Link } from 'react-router-dom';

import './Button.css';

interface ButtonProps {
    href?: string;
    size?: string;
    inverse?: boolean;
    danger?: boolean;
    to?: string;
    onBtnClick?: () => void;
    disabled?: boolean;
    type?: 'submit' | 'button' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    href,
    size,
    inverse,
    danger,
    to,
    onBtnClick,
    disabled,
    children,
    type
}) => {
    if (href) {
        return (
            <a
                className={`button button--${size || 'default'} ${
                    inverse && 'button--inverse'
                } ${danger && 'button--danger'}`}
                href={href}
            >
                {children}
            </a>
        );
    }
    if (to) {
        return (
            <Link
                to={to}
                className={`button button--${size || 'default'} ${
                    inverse && 'button--inverse'
                } ${danger && 'button--danger'}`}
            >
                {children}
            </Link>
        );
    }
    return (
        <button
            className={`button button--${size || 'default'} ${
                inverse && 'button--inverse'
            } ${danger && 'button--danger'}`}
            type={type}
            onClick={onBtnClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
