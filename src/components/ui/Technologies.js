import styled from '@emotion/styled';

export default function Technologies({ technologies }) {
	return (
		<StyledTechnologies>
			{technologies.map((tech, index) => (
				<span key={index} className="tech">
					{tech}
				</span>
			))}
		</StyledTechnologies>
	);
}

const StyledTechnologies = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-top: 1rem;

	.tech {
		background: var(--color-background-alt);
		color: var(--color-text);
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.875rem;
	}
`;
