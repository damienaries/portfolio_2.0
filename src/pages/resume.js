import { useRef } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import resumeData from '../../data/resume_data.json';
import ButtonComponent from '../components/ButtonComponent';

const printStyles = css`
	@media print {
		body * {
			visibility: hidden;
		}

		.resume-content,
		.resume-content * {
			visibility: visible;
		}

		.resume-content {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
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
	position: relative;
`;

const ResumeContent = styled.div`
	background: white;
	padding: 2rem;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
	text-align: center;
	margin-bottom: 2rem;
`;

const Name = styled.h1`
	font-size: 2.5rem;
	margin-bottom: 0.5rem;
	color: #2c3e50;
`;

const ContactInfo = styled.div`
	display: flex;
	justify-content: center;
	gap: 1rem;
	flex-wrap: wrap;
	margin-bottom: 1rem;

	p {
		margin: 0;
		color: #666;
	}
`;

const Title = styled.h2`
	font-size: 1.5rem;
	color: #34495e;
	margin-bottom: 1rem;
`;

const Summary = styled.p`
	font-size: 1.1rem;
	line-height: 1.6;
	color: #555;
	max-width: 700px;
	margin: 0 auto;
`;

const Section = styled.section`
	margin-bottom: 2rem;

	h2 {
		font-size: 1.8rem;
		color: #2c3e50;
		border-bottom: 2px solid #eee;
		padding-bottom: 0.5rem;
		margin-bottom: 1.5rem;
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

	h3 {
		font-size: 1.3rem;
		color: #34495e;
		margin: 0;
	}
`;

const Period = styled.span`
	color: #666;
	font-size: 0.9rem;
`;

const JobDescription = styled.p`
	color: #555;
	margin-bottom: 1rem;
	line-height: 1.5;
`;

const Highlights = styled.ul`
	list-style-type: disc;
	padding-left: 1.5rem;
	margin: 0.5rem 0;

	li {
		margin-bottom: 0.5rem;
		color: #555;
		line-height: 1.4;
	}
`;

const Projects = styled.div`
	margin-top: 1rem;
`;

const Project = styled.div`
	margin-bottom: 1rem;

	h4 {
		color: #34495e;
		margin-bottom: 0.5rem;
	}
`;

const EducationItem = styled.div`
	margin-bottom: 1rem;

	h3 {
		font-size: 1.2rem;
		color: #34495e;
		margin: 0;
	}

	p {
		color: #555;
		margin: 0.25rem 0;
	}
`;

const CompletionDate = styled.span`
	color: #666;
	font-size: 0.9rem;
`;

const SkillsGrid = styled.ul`
	list-style-type: none;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 0.5rem;

	li {
		color: #555;
		line-height: 1.4;
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
							<p>{resumeData.personalInfo.email}</p>
							<p>{resumeData.personalInfo.website}</p>
							<p>{resumeData.personalInfo.linkedin}</p>
							<p>{resumeData.personalInfo.github}</p>
						</ContactInfo>
						<Title>{resumeData.personalInfo.title}</Title>
						<Summary>{resumeData.personalInfo.summary}</Summary>
					</Header>

					{/* Experience Section */}
					<Section>
						<h2>Professional Experience</h2>
						{resumeData.experience.map((job, index) => (
							<Job key={index}>
								<JobHeader>
									<h3>
										{job.position} at {job.company}
									</h3>
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
												<h4>{project.name}</h4>
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
						<h2>Education</h2>
						{resumeData.education.map((edu, index) => (
							<EducationItem key={index}>
								<h3>{edu.institution}</h3>
								<p>{edu.program}</p>
								<CompletionDate>{edu.completionDate}</CompletionDate>
							</EducationItem>
						))}
					</Section>

					{/* Expertise Section */}
					<Section>
						<h2>Areas of Expertise</h2>
						<div>
							<h3>Technical Skills</h3>
							<SkillsGrid>
								{resumeData.expertise.technical.map((skill, index) => (
									<li key={index}>{skill}</li>
								))}
							</SkillsGrid>
						</div>
						<div>
							<h3>Languages</h3>
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
