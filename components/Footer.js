import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import styled from '@emotion/styled';
import Link from 'next/link';


export default function Footer() {
    return (
        <StyledFooter id='footer'>
            <h4 style={{ fontSize: '3rem', textAlign: 'center' }}className="section-title">
                Get in touch
            </h4>
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
        </StyledFooter>
    )
}


const StyledFooter = styled.div`
    width: 100%;
    padding: 2rem 4rem;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 2;
`