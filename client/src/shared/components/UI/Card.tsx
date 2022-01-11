import './Card.css';

const Card: React.FC<{ className: string }> = ({ className, children }) => {
    return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
