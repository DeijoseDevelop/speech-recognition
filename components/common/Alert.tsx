import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

interface AlertProps {
    severity: 'success' | 'info' | 'warning' | 'error';
    message: string;
}

const iconStyles = {
    success: 'text-green-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
    error: 'text-red-500'
};

const backgroundStyles = {
    success: 'bg-green-700',
    info: 'bg-blue-700',
    warning: 'bg-yellow-700',
    error: 'bg-red-700'
};

const Alert: React.FC<AlertProps> = ({ severity, message }) => {
    const icons = {
        success: <FaCheckCircle className={`h-5 w-5 ${iconStyles[severity]}`} />,
        info: <FaInfoCircle className={`h-5 w-5 ${iconStyles[severity]}`} />,
        warning: <FaExclamationTriangle className={`h-5 w-5 ${iconStyles[severity]}`} />,
        error: <FaTimesCircle className={`h-5 w-5 ${iconStyles[severity]}`} />
    };

    return (
        <div className={`flex items-center p-4 mb-4 text-sm rounded-lg ${backgroundStyles[severity]}`} role="alert">
            <div className="flex-shrink-0">
                {icons[severity]}
            </div>
            <div className="ml-3 text-white">
                {message}
            </div>
        </div>
    );
};

export default Alert;
