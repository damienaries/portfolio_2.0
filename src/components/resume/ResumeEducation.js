import styled from '@emotion/styled';
import { FaBook } from 'react-icons/fa';

const Section = styled.section`
	margin-bottom: 1.5rem;

	h3 {
		color: var(--color-blue-gray);
		border-bottom: 2px solid var(--color-blue-gray);
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
`;

const EducationList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
`;

const EducationItem = styled.li`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-size: var(--text-xs);
	color: var(--color-gray-dark);

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
`;

const ResumeEducation = ({ education }) => {
	return (
		<Section>
			<h3>
				<FaBook />
				Education & Self Learning
			</h3>
			<EducationList>
				{education.map((edu, index) => (
					<EducationItem key={index} className="education-item">
						<Institution>{edu.institution}</Institution>
						{edu.program && <Program>- {edu.program}</Program>}
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
