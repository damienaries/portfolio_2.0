import styled from '@emotion/styled';

const Section = styled.section`
	margin-bottom: 2rem;

	h3 {
		color: var(--color-blue-gray);
		border-bottom: 2px solid var(--color-blue-gray);
		padding-bottom: 0.5rem;
		margin-bottom: 1.5rem;
	}

	h5 {
		color: var(--color-gray-dark);
	}
`;

const Job = styled.div`
	margin: 1.5rem 0;
`;

const JobHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	margin-bottom: 0.5rem;

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
	line-height: var(--line-height-relaxed);
`;

const Highlights = styled.ul`
	list-style-type: disc;
	padding-left: 1.5rem;
	margin: 0.5rem 0;

	li {
		margin-bottom: 0.5rem;
		color: var(--color-gray-dark);
		line-height: var(--line-height-relaxed);
		font-size: var(--text-xs);
	}
`;

const Projects = styled.div`
	margin-top: 1rem;
`;

const Project = styled.div`
	margin-bottom: 1rem;

	h5 {
		color: var(--color-gray-dark);
		margin-bottom: 0.5rem;
	}

	p {
		color: var(--color-gray-dark);
	}
`;

const ResumeExperience = ({ experience }) => {
	return (
		<Section>
			<h3>Professional Experience</h3>
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
						<Projects>
							{job.projects.map((project, i) => (
								<Project key={i}>
									<h5>{project.name}</h5>
									<p>{project.description}</p>
								</Project>
							))}
						</Projects>
					)}
				</Job>
			))}
		</Section>
	);
};

export default ResumeExperience;
