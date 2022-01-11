import './Avatar.css';

const Avatar: React.FC<{
    image: string;
    alt: string;
    width: string;
    className: string;
    styles: string;
}> = ({ image, alt, className, width }) => {
    return (
        <div className={`avatar ${className}`}>
            <img
                src={image}
                alt={alt}
                style={{ width: width, height: width }}
            />
        </div>
    );
};

export default Avatar;
