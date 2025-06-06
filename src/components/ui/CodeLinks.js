import styled from '@emotion/styled';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function CodeLinks({ links }) {
	return (
		<StyledCodeLinks>
			{links.github && (
				<a
					href={links.github}
					target="_blank"
					rel="noopener noreferrer"
					className="link"
				>
					<FaGithub />
					<span>Code</span>
				</a>
			)}
			{links.live && (
				<a
					href={links.live}
					target="_blank"
					rel="noopener noreferrer"
					className="link"
				>
					<FaExternalLinkAlt />
					<span>Live</span>
				</a>
			)}
		</StyledCodeLinks>
	);
}

const StyledCodeLinks = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1rem;

	.link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-text);
		text-decoration: none;
		font-size: var(--size-text);
		padding: 0.5rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		transition: all 0.3s ease;

		&:hover {
			background: var(--color-background-alt);
		}

		svg {
			font-size: 1.2rem;
		}
	}
`;
