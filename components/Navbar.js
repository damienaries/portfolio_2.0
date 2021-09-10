import React from 'react';
import Link from 'next/link';
import { useRouter} from 'next/router';
import styled from '@emotion/styled';

/******************
 TODO
    uncomment Blog when some content is there :)
 *****************/

export default function Navbar() {
    const router = useRouter();
    return (
        <StyledNav>
            <h1 className="topbar-left" onClick={() => router.push('/')}>
                Damien<span className="name-logo">Aries</span>
            </h1>
            <div className="topbar-right">
                <Link href='/'>
                    <a className="topbar-right-link">Home</a>
                </Link>
                <Link href='#about'>
                    <a className="topbar-right-link">About</a>
                </Link>
                <Link href='/projects'>
                    <a className="topbar-right-link">Work</a>
                </Link>
                <Link href='#footer'>
                    <a className="topbar-right-link">Contact</a>
                </Link>
                {/*<Link href='/blog'>
                    <a className="topbar-right-link">Blog</a>
                </Link>*/}
            </div>
        </StyledNav>
    )
}

const StyledNav = styled.nav`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    position: fixed;
    z-index: 5;

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

    .topbar-right-link {
        margin-right: 2rem;
        font-size: var(--size-body);
        letter-spacing: 2px;
        transition: box-shadow .3s ease;

        &:hover {
            border-bottom: 2px solid var(--color-white);
            box-shadow: 0 1rem 2rem rgba(253, 253, 253, .5);
        }
    }
`