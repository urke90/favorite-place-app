import './LoadingSpinner.css';

const LoadingSpinner: React.FC<{ asOverlay: boolean }> = ({ asOverlay }) => {
    return (
        <div className={`${asOverlay && 'loading-spinner__overlay'}`}>
            <div className="lds-dual-ring"></div>
        </div>
    );
};

export default LoadingSpinner;
