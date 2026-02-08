import styled from '@emotion/styled';

const Section = styled.section`
	margin-bottom: 1.5rem;

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
		font-size: 1.1rem;
		font-weight: 700;
	}
`;

const Period = styled.span`
	color: var(--color-gray-dark);
	font-size: var(--text-xs);
	font-style: italic;
`;

const JobDescription = styled.p`
	color: var(--color-gray-dark);
	margin-bottom: .5rem;
	font-size: var(--text-xs);
`;

const Highlights = styled.ul`
	list-style-type: square;
	padding-left: 1rem;
	margin: 0.25rem 0;

	li {
		color: var(--color-gray-dark);
		font-size: var(--text-xs);
		margin-bottom: 0.5rem;
	}
`;

const Project = styled.li`
	color: var(--color-gray-dark);
	margin-bottom: 1rem;
	list-style-type: square;
	margin-left: 1rem;
	font-size: var(--text-xs);

	a {
		color: var(--color-gray-dark);
		margin-bottom: 0.5rem;
		font-weight: var(--font-weight-bold);
	}

	p {
		font-size: var(--text-xs);
	}
`;

const ResumeExperience = ({ experience }) => {
	return (
		<Section>
			<h3>
				Professional Experience
			</h3>
			{experience.map((job, index) => (
				<Job key={index} className="job">
					<JobHeader className="job-header">
						<h4>
							{job.position} {job.company !== '' && `at ${job.company}`}
						</h4>
						<Period>{job.period}</Period>
					</JobHeader>
					<JobDescription className="job-description">{job.description}</JobDescription>
					{job.highlights && (
						<Highlights className="highlights">
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
