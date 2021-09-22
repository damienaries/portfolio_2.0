import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import styled from '@emotion/styled';
import Link from 'next/link';


export default function Footer() {
    return (
        <StyledFooter id='contact'>
            <h4 style={{ fontSize: '3rem', textAlign: 'center' }}className="section-title">
                Get in touch
            </h4>
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
        font-size: 2.5rem;
        top: 1rem;
        text-align: center;
        margin-bottom: 4rem;
        font-weight: var(--weight-thin);
    }

    .footer-email {
        font-size: 1.8rem;
        letter-spacing: .5px;
        margin-bottom: 1rem;
        border-radius: var(--radius);
        padding: .5rem .75rem;
        transition: all .1s ease-out;
        
        &:hover {
            filter: brightness(110%);
            cursor: pointer;
            box-shadow: var(--shadow-light);
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
            font-size: 5rem;
            padding: .75rem;
            border-radius: var(--radius);
            transition: all .1s ease-out;

            &:hover {
                filter: brightness(110%);
                cursor: pointer;
                box-shadow: var(--shadow-light);
            }
        }
    }

`