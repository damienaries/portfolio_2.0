import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter} from 'next/router';
import styled from '@emotion/styled';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { FaBars } from "react-icons/fa";
import { MdClose } from 'react-icons/md';
import { fadeIn } from '../styles/animations';

export default function Navbar() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [navOpen, setIsNavOpen] = useState(false);

    // Lock scroll
    useEffect(() => {
        if (navOpen) {
            document.body.style.overflow = 'hidden';
        } else {   
            document.body.style.overflow = 'unset';
        }   
    },[navOpen])

    // toggle mobile nav, auto close 15sec
    const toggleNav = () => {
        setIsNavOpen(prevState => !prevState);   
        setTimeout(() => {
            setIsNavOpen(false)
        }, 15000);
    }

    return (
        <StyledNav>
            <h1 className="topbar-left" onClick={() => router.push('/')}>
                D<span className="name-logo">A</span>
            </h1>
            
            <div className="topbar-right">
                { width > 600 ? (
                    <>
                        {/* full size nav */}
                        <Link href='/'>
                            <a className="topbar-right-link">Home</a>
                        </Link>
                        <Link href='/projects'>
                            <a className="topbar-right-link">Work</a>
                        </Link>
                        <Link href='#contact'>
                            <a className="topbar-right-link">Contact</a>
                        </Link> 
                    </>
                ) : (
                    <div className="mobile-nav-action">
                    {
                        !navOpen ? (
                            <FaBars className="action-button" onClick={toggleNav} />
                        ) : (
                            <MdClose className="action-button" onClick={toggleNav} />
                        )
                    }
                    </div>
                )}    
                 
            </div>
            {/* Mobile Nav full screen Modal */}
            {
                navOpen && (
                    <div 
                        className="mobile-nav" 
                        style={{ right: !navOpen ? '-100%' : 0 }}
                        >
                        <Link href='/'>
                            <a className="mobile-nav-link" onClick={toggleNav}>Home</a>
                        </Link>
                        <Link href='/projects'>
                            <a className="mobile-nav-link" onClick={toggleNav}>Work</a>
                        </Link>
                        <Link href='#contact'>
                            <a className="mobile-nav-link" onClick={toggleNav}>Contact</a>
                        </Link>
                    </div>
                )
            }       
        </StyledNav>
    )
}

const StyledNav = styled.nav`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.5rem;
    position: relative;

    .topbar-left {
        font-size: var(--size-subtitle);
        font-weight: var(--weight-thin);
        letter-spacing: 1px;
        
        &:hover {
            cursor: pointer;
            filter: brightness(90%);
        }

        .name-logo {
            font-weight: var(--weight-bold);
        }
    }

    .topbar-right {
        position: relative;
    }

    .topbar-right-link {
        margin: 1rem;
        font-size: var(--size-body);
        letter-spacing: 3px;
        transition: filter .3s ease;
        padding-bottom: .5rem;

        &:hover {
            border-bottom: 2px solid var(--color-white);
            filter: drop-shadow(0 0.25rem .5rem var(--color-white));
        }
    }

    .action-button {
        font-size: 2rem;
        position: fixed;
        top: 2rem;
        right: 1.5rem;
        z-index: 15;

        &:hover {
            cursor: pointer;
        }

    }

    .mobile-nav {
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
        height: 100vh;
        width: 100vw;
        background-image: linear-gradient(
            to right bottom,
            var(--color-blue),
            var(--color-blue-light-opaque),
            var(--color-blue-dark-opaque)
        );
        animation: ${fadeIn} .2s ease-out; 
        z-index: 10;
        
        &-link {
            text-align: center;
            width: fit-content;
            margin: 1rem auto;
            font-size: 2.5rem;
            letter-spacing: 3px;

            &:focus,
            &:active,
            &:hover {
                border-bottom: 1px solid var(--color-white);
                /* box-shadow: 0 .5rem 1rem rgba(253, 253, 253, .5); */
            }
        }
    }
`