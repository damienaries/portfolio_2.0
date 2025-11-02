import styled from '@emotion/styled';
import { FaCogs } from 'react-icons/fa';

const Section = styled.section`
	margin-bottom: 1.5rem;

	h3 {
		color: var(--color-blue-gray);
		border-bottom: 1px solid var(--color-blue-gray);
		padding-bottom: 0.25rem;
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.25em;
		justify-content: flex-start;
	}
`;

const SkillsLine = styled.div`
	font-size: 1rem;
	color: var(--color-gray-dark);
	margin-bottom: 0.1em;
	line-height: 1.5;
	display: flex;
	align-items: baseline;
`;

const GroupTitle = styled.span`
	font-weight: 700;
	color: var(--color-blue-gray);
	margin-right: 0.3em;
`;

const TitleIcon = styled(FaCogs)`
	font-size: 1.1em;
	margin-right: 0.3em;
`;

const ResumeExpertise = ({ expertise }) => {
	return (
		<Section>
			<h3>
				<TitleIcon />
				Core Skills
			</h3>
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
