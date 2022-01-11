import { CardProps } from 'models/card';
import './Card.css';

const Card: React.FC<CardProps> = ({ className, children }) => {
    return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
