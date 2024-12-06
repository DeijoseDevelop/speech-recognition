import Image from 'next/image';
import React from 'react';

interface CircleAvatarProps {
    src?: string;
    text?: string;
    size?: number;
    bgColor?: string;
    textColor?: string;
}

const CircleAvatar: React.FC<CircleAvatarProps> = ({
    src,
    text,
    size = 60,
    bgColor = '#ccc',
    textColor = '#fff'
}) => {
    const style = {
        width: size,
        height: size,
        backgroundColor: bgColor,
        color: textColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        overflow: 'hidden',
        fontSize: size / 2,
        fontWeight: 'bold',
    };

    return (
        <div style={{ ...style, border: "1px solid #0EA5E9" }}>
            <div style={{ ...style, width: size * 2 / 2.2, height: size * 2 / 2.2 }}>
                {src ? <Image src={src} alt="Avatar" style={{ width: '100%', height: '100%' }} /> : text}
            </div>
        </div>
    );
};

export default CircleAvatar;
