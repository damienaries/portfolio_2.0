import styled from '@emotion/styled';
import { BiLogoGmail } from 'react-icons/bi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import MagneticLink from './MagneticLink';

export default function Footer() {
	return (
		<StyledFooter id="contact">
			<h5 className="section-title">Get in touch</h5>

			<div className="social-links">
				<MagneticLink
					href="https://www.linkedin.com/in/damien-aries"
					target="_blank"
					rel="noopener"
					label="Linkedin profile"
					className="icon-link"
				>
					<FaLinkedinIn />
				</MagneticLink>
				<MagneticLink
					href="mailto:damien.aries@gmail.com"
					label="Email"
					className="icon-link"
				>
					<BiLogoGmail />
				</MagneticLink>
				<MagneticLink
					href="https://github.com/damienaries"
					target="_blank"
					rel="noopener"
					label="Github profile"
					className="icon-link"
				>
					<FaGithub />
				</MagneticLink>
			</div>
		</StyledFooter>
	);
}

const StyledFooter = styled.footer`
	width: 100%;
	padding: 2rem 3rem;
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
		margin: 0 auto 1rem;
		text-align: center;
		font-weight: var(--weight-thin);
	}

	.social-links {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		margin: 1rem auto;
		font-size: var(--text-body);
	}

	.icon-link {
		display: inline-block;
		cursor: pointer;

		& > svg {
			font-size: 3rem;
		}
	}
`;
