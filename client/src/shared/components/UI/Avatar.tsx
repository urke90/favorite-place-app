import './Avatar.css';

const Avatar: React.FC<{
    image: string;
    alt?: string;
    width?: number;
    className?: string;
    styles?: string;
}> = ({ image, alt, className, width }) => {
    return (
        <div className={`avatar ${className}`}>
            <img
                src={'http://localhost:5000/' + image}
                alt={alt}
                style={{ width: width }}
            />
        </div>
    );
};

export default Avatar;
