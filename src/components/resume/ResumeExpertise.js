import styled from '@emotion/styled';

const Section = styled.section`
	margin-bottom: 1.5rem;
`;

const SkillsLine = styled.div`
	font-size: 0.85rem;
	color: var(--color-gray-dark);
	margin-bottom: 0.25rem;
	line-height: 1.5;
	display: flex;
	flex-direction: column;
`;

const GroupTitle = styled.span`
	font-weight: 700;
	color: var(--color-gray-dark);
	margin-right: 0.3em;
`;

const ResumeExpertise = ({ expertise }) => {
	return (
		<Section>
			<h3>Core Skills</h3>
			{expertise.coreSkills.map((group, idx) => (
				<SkillsLine key={idx}>
					<GroupTitle>{group.group}:</GroupTitle>
					{group.skills.join(', ')}
				</SkillsLine>
			))}
		</Section>
	);
};

export default ResumeExpertise;
