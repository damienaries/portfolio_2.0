import styled from '@emotion/styled';
import Link from 'next/link';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function Contact() {
    return (
        <StyledContact>
            <Link href="mailto:damien.aries@gmail.com">
                <a>damien.aries@gmail.com</a>
            </Link>
            <div className="social-links">
                <Link href="https://www.linkedin.com/in/damien-aries">
                    <a><FaLinkedinIn /></a>
                </Link>
                <Link href="https://github.com/damienaries">
                    <a><FaGithub /></a>
                </Link>
                <Link href="https://twitter.com/DamienAries">
                    <a><FaTwitter /></a>
                </Link>
            </div>
        </StyledContact>
    )
}

const StyledContact = styled.div`
    width: 100%;
    padding: 2rem 4rem;
    font-size: 1.5rem;
`
