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

const EducationItem = styled.div`
	margin-bottom: 1rem;
	h4 {
		color: var(--color-gray-dark);
		margin: 0;
	}

	p {
		color: var(--color-gray-dark);
		margin: 0.25rem 0;
	}
`;

const CompletionDate = styled.span`
	color: var(--color-gray-dark);
	font-size: var(--text-xs);
`;

const ResumeEducation = ({ education }) => {
	return (
		<Section>
			<h3>Education</h3>
			{education.map((edu, index) => (
				<EducationItem key={index} className="education-item">
					<h4>{edu.institution}</h4>
					<p>{edu.program}</p>
					<CompletionDate>{edu.completionDate}</CompletionDate>
				</EducationItem>
			))}
		</Section>
	);
};

export default ResumeEducation;
