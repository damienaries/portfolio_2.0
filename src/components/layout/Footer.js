import styled from '@emotion/styled';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
	return (
		<StyledFooter>
			<div className="footer-content">
				<div className="social-links">
					<a
						href="https://github.com/damienaries"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaGithub />
					</a>
					<a
						href="https://linkedin.com/in/damienaries"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaLinkedin />
					</a>
				</div>
				<p>© {new Date().getFullYear()} Damien Aries. All rights reserved.</p>
			</div>
		</StyledFooter>
	);
}

const StyledFooter = styled.footer`
	background: var(--color-background);
	border-top: 1px solid var(--color-border);
	padding: 2rem 0;

	.footer-content {
		max-width: 1300px;
		margin: 0 auto;
		padding: 0 2rem;
		text-align: center;
	}

	.social-links {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-bottom: 1rem;

		a {
			color: var(--color-text);
			font-size: 1.5rem;
			transition: opacity 0.3s ease;

			&:hover {
				opacity: 0.7;
			}
		}
	}

	p {
		color: var(--color-text);
		font-size: var(--size-text);
	}
`;
