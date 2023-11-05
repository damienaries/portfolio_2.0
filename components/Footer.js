import styled from '@emotion/styled';
import Link from 'next/link';
import { BiLogoGmail } from 'react-icons/bi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
	return (
		<StyledFooter id="contact">
			<h3 className="section-title">Get in touch</h3>

			<div className="social-links">
				<Link href="https://www.linkedin.com/in/damien-aries">
					<a
						target="_blank"
						rel="noopener"
						className="icon-link"
						aria-label="Linkedin profile"
					>
						<FaLinkedinIn />
					</a>
				</Link>
				<Link href="mailto:damien.aries@gmail.com">
					<a className="icon-link">
						<BiLogoGmail />
					</a>
				</Link>
				<Link href="https://github.com/damienaries">
					<a
						target="_blank"
						rel="noopener"
						className="icon-link"
						aria-label="Github profile"
					>
						<FaGithub />
					</a>
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
		font-size: var(--size-title-section);
		margin: 1rem auto;
		text-align: center;
		font-weight: var(--weight-thin);
	}

	.social-links {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		margin: 2rem auto 3rem;
		font-size: var(--size-body);
	}

	.icon-link {
		transition: all 0.1s ease-out;

		& > svg {
			font-size: 3rem;
		}
		
		&:hover {
				transform: scale(.95);
			}
	}
`;
