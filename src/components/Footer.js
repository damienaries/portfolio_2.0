import styled from '@emotion/styled';
import Link from 'next/link';
import { BiLogoGmail } from 'react-icons/bi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
	return (
		<StyledFooter id="contact">
			<h5 className="section-title">Get in touch</h5>

			<div className="social-links">
				<Link
					href="https://www.linkedin.com/in/damien-aries"
					target="_blank"
					rel="noopener"
					className="icon-link"
					aria-label="Linkedin profile"
				>
					<FaLinkedinIn />
				</Link>
				<Link href="mailto:damien.aries@gmail.com" className="icon-link">
					<BiLogoGmail />
				</Link>
				<Link
					href="https://github.com/damienaries"
					target="_blank"
					rel="noopener"
					className="icon-link"
					aria-label="Github profile"
				>
					<FaGithub />
				</Link>
			</div>
		</StyledFooter>
	);
}

const StyledFooter = styled.footer`
	width: 100%;
	padding: 2rem 4rem;
	position: relative;

	::before {
		content: '';
		height: 1px;
		width: 80vw;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		background-color: ${(props) => props.theme.borderColor};
	}

	.section-title {
		margin: 1rem auto;
		text-align: center;
		font-weight: var(--weight-thin);
	}

	.social-links {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		margin: 2rem auto 3rem;
		font-size: var(--text-body);
	}

	.icon-link {
		transition: all 0.1s ease-out;

		& > svg {
			font-size: 3rem;
		}

		&:hover {
			transform: scale(0.95);
		}
	}
`;
