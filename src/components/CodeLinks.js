import styled from '@emotion/styled';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { MdOpenInNew } from 'react-icons/md';

export default function CodeLinks({ githubLink, liveLink }) {
	return (
		<StyledLinks>
			{githubLink && (
				<Link href={`${githubLink}`} className="code-link" target="_blank">
					Code <FaGithub className="icon" />
				</Link>
			)}
			{liveLink && (
				<Link href={`${liveLink}`} className="code-link" target="_blank">
					Site <MdOpenInNew className="icon" />
				</Link>
			)}
		</StyledLinks>
	);
}

const StyledLinks = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 1rem;

	.code-link {
		font-size: var(--size-body);
		padding: 0.5rem 1.5rem;
		margin: 0.5rem;
		border-radius: 50px;
		background-image: ${(props) => props.theme.techPillGradient};
		color: ${(props) => props.theme.text};
		transition: all 0.2s ease-out;
		display: flex;
		align-items: center;
		box-shadow: ${(props) => props.theme.boxShadow};

		.icon {
			margin-left: 0.5rem;
		}

		&:hover {
			background-color: ${(props) => props.theme.buttonBgHover};
		}
	}

	@media screen and (max-width: 600px) {
		padding: 1rem 0;
	}
`;
