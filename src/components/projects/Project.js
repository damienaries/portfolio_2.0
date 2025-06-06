import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import CodeLinks from '../ui/CodeLinks';
import Technologies from '../ui/Technologies';

export default function Project({ project }) {
	return (
		<StyledProject>
			<div className="project-image">
				<Image
					src={project.image}
					alt={project.title}
					width={600}
					height={400}
					style={{ objectFit: 'cover' }}
				/>
			</div>
			<div className="project-content">
				<h2>{project.title}</h2>
				<p>{project.description}</p>
				<Technologies technologies={project.technologies} />
				<CodeLinks links={project.links} />
			</div>
		</StyledProject>
	);
}

const StyledProject = styled.article`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem;
	margin-bottom: 4rem;
	padding: 2rem;
	background: var(--color-background);
	border: 1px solid var(--color-border);
	border-radius: 8px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}

	.project-image {
		position: relative;
		width: 100%;
		height: 400px;
		border-radius: 4px;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.project-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		h2 {
			font-size: var(--size-title-section);
			font-weight: var(--weight-bold);
			margin: 0;
		}

		p {
			font-size: var(--size-text);
			line-height: 1.6;
			margin: 0;
		}
	}
`;
