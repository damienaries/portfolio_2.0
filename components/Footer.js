import styled from '@emotion/styled';
import Link from 'next/link';
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
						className="social-link"
						aria-label="Linkedin profile"
					>
						<FaLinkedinIn />
					</a>
				</Link>
				<Link href="mailto:damien.aries@gmail.com">
					<a className="footer-email">damien.aries@gmail.com</a>
				</Link>
				<Link href="https://github.com/damienaries">
					<a
						target="_blank"
						rel="noopener"
						className="social-link"
						aria-label="Github profile"
					>
						<FaGithub />
					</a>
				</Link>
			</div>
		</StyledFooter>
	);
}

const StyledFooter = styled.div`
	width: 100%;
	padding: 2rem 4rem;
	font-size: 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	line-height: 2;
	border-top: 1px solid rgba(255, 255, 255, 0.1);

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

		&:hover {
			filter: drop-shadow(0 0.25rem 0.5rem var(--color-white));
			cursor: pointer;
		}
	}

	.social-links {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 70%;
	}

	.social-link {
		& > svg {
			font-size: 3rem;

			&:hover {
				cursor: pointer;
				filter: drop-shadow(0 0.25rem 0.5rem var(--color-white));
				color: red;
			}
		}
	}
`;
