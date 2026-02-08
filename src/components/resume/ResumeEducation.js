import styled from '@emotion/styled';

const Section = styled.section`
	margin-bottom: 1.5rem;
`;

const EducationList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

const EducationItem = styled.li`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	font-size: var(--text-xs);
	color: var(--color-gray-dark);
	margin-bottom: 0.25rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

const Institution = styled.span`
	font-weight: var(--font-weight-bold);
`;

const Program = styled.span`
	font-style: italic;
`;

const CompletionDate = styled.span`
	color: var(--color-gray-dark);
	font-style: italic;
	font-size: var(--text-xs);
`;

const ResumeEducation = ({ education }) => {
	return (
		<Section className="education-section">
			<h3>Education & <br />Self Learning</h3>
			<EducationList>
				{education.map((edu, index) => (
					<EducationItem key={index} className="education-item">
						<Institution>{edu.institution}</Institution>
						{edu.program && <Program> {edu.program}</Program>}
						{edu.completionDate && (
							<CompletionDate>({edu.completionDate})</CompletionDate>
						)}
					</EducationItem>
				))}
			</EducationList>
		</Section>
	);
};

export default ResumeEducation;
