import { keyframes } from '@emotion/react';

export const moveInTop = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
`

export const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

export const moveInBottom = keyframes`
    0% {
        opacity: 0;
        transform: translateY(100%);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
`

export const rotate = keyframes`
    0% {
        transform: translateX(20%);
    }
    100% {
        transform: translateX(0);
    }
`