import { useState, useEffect } from 'react';

// const getWindowDimensions = () => {
//     if (typeof window !== 'undefined') {
//         const { innerWidth: width, innerHeight: height } = window;
//         return { width, height };
//     }
// }

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return windowDimensions;
}