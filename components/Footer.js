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
                <a className="footer-email">damien.aries@gmail.com</a>
            </Link>
            <div>
                <Link href="https://www.linkedin.com/in/damien-aries">
                    <a className="social-link"><FaLinkedinIn /></a>
                </Link>
                <Link href="https://github.com/damienaries">
                    <a className="social-link"><FaGithub /></a>
                </Link>
                <Link href="https://twitter.com/DamienAries">
                    <a className="social-link"><FaTwitter /></a>
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
        border-radius: 50px;
        padding: .5rem 1rem;
        transition: all .1s ease-out;
        
        &:hover {
            filter: brightness(110%);
            cursor: pointer;
            box-shadow: var(--shadow-light);
        }
    }

    .social-link {
        font-size: 2rem;
        margin: 2rem;
        padding: .5rem .75rem;
        border-radius: 50%;
        transition: all .1s ease-out;

        &:hover {
            filter: brightness(110%);
            cursor: pointer;
            box-shadow: var(--shadow-light);
        }
    }

`