import React, { CSSProperties } from 'react';

interface TextButtonProps {
    text: string;
    onClick: () => void;
    textColor: string;
    bgColor: string;
    className?: string;
    style?: CSSProperties;
}

const TextButton: React.FC<TextButtonProps> = ({ text, onClick, textColor, bgColor, className, style }) => {
    return (
        <button
            onClick={onClick}
            style={style}
            className={`bg-transparent hover:bg-${bgColor}-200 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-${textColor}-500 focus:ring-opacity-50 text-${textColor}-500 ${className}`}
        >
            {text}
        </button>
    );
};

export default TextButton;
