import styled from '@emotion/styled';
import { FaBriefcase } from 'react-icons/fa';

const Section = styled.section`
	margin-bottom: 2rem;

	h3 {
		color: var(--color-blue-gray);
		border-bottom: 2px solid var(--color-blue-gray);
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	h5 {
		color: var(--color-gray-dark);
	}
`;

const Job = styled.div`
	margin-bottom: 1.5rem;
`;

const JobHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;

	h4 {
		color: var(--color-gray-dark);
		margin: 0;
	}
`;

const Period = styled.span`
	color: var(--color-gray-dark);
	font-size: var(--text-xs);
`;

const JobDescription = styled.p`
	color: var(--color-gray-dark);
	margin-bottom: 1rem;
`;

const Highlights = styled.ul`
	list-style-type: square;
	padding-left: 1.5rem;
	margin: 0.5rem 0;

	li {
		color: var(--color-gray-dark);
		font-size: var(--text-body);
	}
`;

const Project = styled.li`
	color: var(--color-gray-dark);
	margin-bottom: 1rem;
	list-style-type: square;
	margin-left: 1rem;

	a {
		color: var(--color-gray-dark);
		margin-bottom: 0.5rem;
		font-weight: var(--font-weight-bold);
	}
`;

const ResumeExperience = ({ experience }) => {
	return (
		<Section>
			<h3>
				<FaBriefcase />
				Professional Experience
			</h3>
			{experience.map((job, index) => (
				<Job key={index} className="job">
					<JobHeader>
						<h4>
							{job.position} at {job.company}
						</h4>
						<Period>{job.period}</Period>
					</JobHeader>
					<JobDescription>{job.description}</JobDescription>
					{job.highlights && (
						<Highlights>
							{job.highlights.map((highlight, i) => (
								<li key={i}>{highlight}</li>
							))}
						</Highlights>
					)}
					{job.projects && (
						<ul>
							{job.projects.map((project, i) => (
								<Project key={i}>
									<a
										href={`https://www.${project.name.toLowerCase()}`}
										target="_blank"
									>
										{project.name}
									</a>
									<p>{project.description}</p>
								</Project>
							))}
						</ul>
					)}
				</Job>
			))}
		</Section>
	);
};

export default ResumeExperience;
