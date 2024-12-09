"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import useResponsive from '@/hooks/useResponsive';

export interface LogoProps {
    width?: number;
    height?: number;
    src?: string;
    alt?: string;
    style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ width, height, src, alt, style }) => {
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const [size, setSize] = useState<LogoProps>({ width: 300, height: 100 });

    const getImageSize = useCallback(() => {
        if (isMobile) return { width: 100, height: 60 };
        if (isTablet) return { width: 200, height: 75 };
        if (isDesktop) return { width: 300, height: 100 };
        return { width: 100, height: 100 };
    }, [isDesktop, isMobile, isTablet]);

    useEffect(() => {
        setSize(getImageSize());
    }, [getImageSize])

    return (
        <Image
            src={src!}
            width={width ?? size.width ?? 300}
            height={height ?? size.height ?? 100}
            quality={50}
            priority={false}
            alt={alt ?? "Logo"}
            style={style}
        />
    );
}

export default Logo;