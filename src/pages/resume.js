import { useRef } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import resumeData from '../../data/resume_data.json';
import ButtonComponent from '../components/ButtonComponent';
import { MdEmail } from 'react-icons/md';
import { FaGlobe, FaLinkedin, FaGithub } from 'react-icons/fa';

const printStyles = css`
	@media print {
		body * {
			visibility: hidden;
		}

		.resume-content,
		.resume-content * {
			visibility: visible;
		}

		.resume-container {
			visibility: hidden;
		}

		.resume-content {
			visibility: visible;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			margin: 0;
			padding: 3rem;
			background: white;
			box-shadow: none;
		}

		/* Page break controls & Prevent orphaned headings */
		section,
		.job,
		.education-item,
		h2 {
			page-break-inside: avoid;
			break-inside: avoid;
		}

		/* Add spacing before major sections */
		section:not(:first-child) {
			margin-top: 2rem;
		}

		/* Add some space after page breaks */
		section::before {
			content: '';
			display: block;
			height: 1rem;
		}

		.print-button {
			display: none;
		}

		@page {
			size: A4;
			margin: 20mm;
		}
	}
`;

// Styled Components
const ResumeContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 2rem;
`;

const ResumeContent = styled.div`
	background: white;
	padding: 2rem;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	max-width: 800px;
`;

const Header = styled.header`
	text-align: center;
	margin-bottom: 2rem;
`;

const Name = styled.h1`
	margin-bottom: 0.5rem;
	color: var(--color-gray-light);
`;

const ContactInfo = styled.div`
	display: flex;
	justify-content: center;
	gap: 1rem;
	flex-wrap: wrap;
	margin-bottom: 1rem;

	a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-gray-dark);
		text-decoration: none;
		transition: color 0.2s ease;

		&:hover {
			color: var(--color-gray-light);
		}

		svg {
			font-size: 1.6rem;
		}
	}
`;

const Title = styled.h3`
	color: var(--color-gray-light);
	margin-bottom: 1rem;
`;

const Summary = styled.small`
	line-height: var(--line-height-relaxed);
	color: var(--color-gray-dark);
	max-width: 700px;
	margin: 0 auto;
`;

const Section = styled.section`
	margin-bottom: 2rem;

	h3 {
		color: var(--color-gray-light);
		border-bottom: 2px solid #eee;
		padding-bottom: 0.5rem;
		margin-bottom: 1.5rem;
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

const ResumePage = () => {
	const componentRef = useRef(null);

	const handlePrint = () => {
		window.print();
	};

	return (
		<>
			<Global styles={printStyles} />
			<ResumeContainer>
				<ButtonComponent onClick={handlePrint} className="print-button">
					Download PDF
				</ButtonComponent>

				<ResumeContent ref={componentRef} className="resume-content">
					{/* Header Section */}
					<Header>
						<Name>{resumeData.personalInfo.name}</Name>
						<ContactInfo>
							<a
								href={`https://${resumeData.personalInfo.website}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FaGlobe />
								<small>{resumeData.personalInfo.website}</small>
							</a>
							<a
								href={`https://${resumeData.personalInfo.linkedin}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FaLinkedin />
								<small>{resumeData.personalInfo.linkedin}</small>
							</a>
							<a
								href={`https://${resumeData.personalInfo.github}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FaGithub />
								<small>{resumeData.personalInfo.github}</small>
							</a>
							<a href={`mailto:${resumeData.personalInfo.email}`}>
								<MdEmail />
								<small>{resumeData.personalInfo.email}</small>
							</a>
						</ContactInfo>
						<Title>{resumeData.personalInfo.title}</Title>
						<Summary>{resumeData.personalInfo.summary}</Summary>
					</Header>

					{/* Experience Section */}
					<Section>
						<h3>Professional Experience</h3>
						{resumeData.experience.map((job, index) => (
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

					{/* Education Section */}
					<Section>
						<h3>Education</h3>
						{resumeData.education.map((edu, index) => (
							<EducationItem key={index} className="education-item">
								<h4>{edu.institution}</h4>
								<p>{edu.program}</p>
								<CompletionDate>{edu.completionDate}</CompletionDate>
							</EducationItem>
						))}
					</Section>

					{/* Expertise Section */}
					<Section>
						<h3>Areas of Expertise</h3>
						<div>
							<h5>Technical Skills</h5>
							<SkillsGrid>
								{resumeData.expertise.technical.map((skill, index) => (
									<li key={index}>{skill}</li>
								))}
							</SkillsGrid>
						</div>
						<div>
							<h5>Languages</h5>
							<SkillsGrid>
								{resumeData.expertise.languages.map((lang, index) => (
									<li key={index}>
										{lang.language} ({lang.level})
									</li>
								))}
							</SkillsGrid>
						</div>
					</Section>
				</ResumeContent>
			</ResumeContainer>
		</>
	);
};

export default ResumePage;
