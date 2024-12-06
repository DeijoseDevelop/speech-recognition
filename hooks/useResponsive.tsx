import { useMediaQuery } from 'react-responsive';

const useResponsive = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 641px) and (max-width: 1023px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
    const isLargeDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

    return {
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
    };
};

export default useResponsive;
