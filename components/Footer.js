import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import styled from '@emotion/styled';
import Link from 'next/link';


export default function Footer() {
    return (
        <StyledFooter id='contact'>
            <h3 className="section-title">
                Get in touch
            </h3>
            <Link href="mailto:damien.aries@gmail.com">
                <a className="footer-email">damien.aries@gmail.com</a>
            </Link>
            <div className="social-links">
                <Link href="https://www.linkedin.com/in/damien-aries">
                    <a target="_blank" 
                        rel="noopener" 
                        className="social-link"
                        aria-label="Linkedin profile">
                        <FaLinkedinIn />
                    </a>
                </Link>
                <Link href="https://github.com/damienaries">
                    <a target="_blank" 
                        rel="noopener" 
                        className="social-link"
                        aria-label="Github profile">
                        <FaGithub />
                    </a>
                </Link>
                <Link href="https://twitter.com/DamienAries">
                    <a target="_blank" 
                        rel="noopener" 
                        className="social-link"
                        aria-label="Twitter profile">
                        <FaTwitter />
                    </a>
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

    .section-title {
        font-size: var(--size-title-section);
        top: 1rem;
        text-align: center;
        font-weight: var(--weight-thin);
    }

    .footer-email {
        font-size: var(--size-subtitle);
        letter-spacing: 2px;
        margin: 2rem auto;
        border-radius: 50px;
        padding: .5rem 1.5rem;
        transition: all .1s ease-out;
        
        &:hover {
            filter: drop-shadow(0 0.25rem .5rem var(--color-white));
            cursor: pointer;
        }
    }

    .social-links {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 90%;
    }

    .social-link { 
        & > svg {
            font-size: 3rem;
            transition: all .1s ease;

            &:hover {
                cursor: pointer;
                filter: drop-shadow(0 0.25rem .5rem var(--color-white));
            }
        }
    }

`