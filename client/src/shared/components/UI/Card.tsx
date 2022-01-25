import './Card.css';

interface CardProps {
    className?: string;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
    return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
