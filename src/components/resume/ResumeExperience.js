import styled from '@emotion/styled';
import React from 'react';

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

const ExperienceContinued = styled.h3`
	display: none !important;
	visibility: hidden;
	height: 0;
	margin: 0;
	padding: 0;

	@media print {
		display: block !important;
		visibility: visible;
		height: auto;
		color: var(--color-gray-dark);
		border-bottom: 1px solid var(--color-gray-dark);
		margin-bottom: 0.5rem;
		margin-top: 5rem;
		padding-top: 3rem;
		font-size: 1rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		width: 100%;
		margin-left: 0;
		margin-right: 0;
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
							{job.projects.map((project, i) => {
								const isJudiBoisson = project.name.toLowerCase() === 'judiboisson.com';
								return (
									<React.Fragment key={i}>
										{isJudiBoisson && (
											<li style={{ listStyle: 'none', marginBottom: 0 }}>
												<ExperienceContinued className="experience-continued">
													Professional Experience Continued
												</ExperienceContinued>
											</li>
										)}
										<Project>
											<a
												href={`https://www.${project.name.toLowerCase()}`}
												target="_blank"
											>
												{project.name}
											</a>
											<p>{project.description}</p>
										</Project>
									</React.Fragment>
								);
							})}
						</ul>
					)}
				</Job>
			))}
		</Section>
	);
};

export default ResumeExperience;
