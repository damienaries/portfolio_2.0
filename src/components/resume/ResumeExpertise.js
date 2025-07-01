import styled from '@emotion/styled';

const Section = styled.section`
	margin-bottom: 2rem;

	h3 {
		color: var(--color-gray-light);
		border-bottom: 2px solid #eee;
		padding-bottom: 0.5rem;
		margin-bottom: 1.5rem;
	}
`;

const SkillsGrid = styled.ul`
	list-style-type: none;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 0.5rem;

	li {
		color: var(--color-gray-dark);
		line-height: var(--line-height-relaxed);
		font-size: var(--text-xs);
	}
`;

const ResumeExpertise = ({ expertise }) => {
	return (
		<Section>
			<h3>Areas of Expertise</h3>
			<div>
				<h5>Technical Skills</h5>
				<SkillsGrid>
					{expertise.technical.map((skill, index) => (
						<li key={index}>{skill}</li>
					))}
				</SkillsGrid>
			</div>
			<div>
				<h5>Languages</h5>
				<SkillsGrid>
					{expertise.languages.map((lang, index) => (
						<li key={index}>
							{lang.language} ({lang.level})
						</li>
					))}
				</SkillsGrid>
			</div>
		</Section>
	);
};

export default ResumeExpertise;
