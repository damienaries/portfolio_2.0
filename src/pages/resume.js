import { useRef } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import resumeData from '../../data/resume_data.json';
import ButtonComponent from '../components/ButtonComponent';
import ResumeHeader from '../components/resume/ResumeHeader';
import ResumeExperience from '../components/resume/ResumeExperience';
import ResumeEducation from '../components/resume/ResumeEducation';
import ResumeExpertise from '../components/resume/ResumeExpertise';
import { useReactToPrint } from 'react-to-print';
import { breathingCardEffect } from '../styles/animations';

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
			padding: 2rem;
			background: white;
			box-shadow: none;
		}

		/* Page break controls - allow jobs to break cleanly */
		.job {
			break-inside: auto;
			page-break-inside: auto;
		}

		/* Prevent breaking within job header, description, or highlights */
		.job-header,
		.job-description,
		.highlights {
			break-inside: avoid;
			page-break-inside: avoid;
		}

		/* Prevent orphaned headings and education items */
		.education-item,
		h3,
		small {
			break-inside: avoid;
		}

		/* Force Education section to start on page 2 */
		.education-section {
			page-break-before: always;
			break-before: page;
		}

		/* Prevent blank pages */
		.resume-content {
			page-break-after: avoid;
		}

		.resume-content > *:last-child {
			page-break-after: avoid;
			margin-bottom: 0;
		}

		/* Add spacing before major sections */
		section:not(:first-of-type) {
			margin-top: 2rem;
		}

		.print-button {
			display: none;
		}

		/* Control orphans and widows to prevent blank pages */
		.resume-content {
			orphans: 3;
			widows: 3;
		}

		@page {
			size: A4;
			margin: 15mm;
		}

		/* Prevent blank pages at the end */
		@page :blank {
			@top-center {
				content: none;
			}
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
	padding: 1rem;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	max-width: 800px;
	${breathingCardEffect}
`;

const TwoColumnLayout = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 2rem;
	margin-bottom: 1.5rem;
`;

const LeftColumn = styled.div`
	flex: 1;
`;

const RightColumn = styled.div`
	width: 200px;
	align-self: flex-start;
`;

const ExperienceContinued = styled.h3`
	display: none;

	@media print {
		display: block;
		color: var(--color-gray-dark);
		border-bottom: 1px solid var(--color-gray-dark);
		margin-bottom: 0.5rem;
		font-size: 1rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		page-break-before: always;
		break-before: page;
	}
`;

const DownloadButton = styled.div`
	position: absolute;
	top: 2.5rem;
	right: -1.5rem;
	z-index: 10;
`;

const ResumePage = () => {
	const contentRef = useRef(null);
	const reactToPrintFn = useReactToPrint({ contentRef });

	return (
		<>
			<Global styles={printStyles} />
			<ResumeContainer ref={contentRef}>
				<DownloadButton>
					<ButtonComponent
						onClick={reactToPrintFn}
						className="print-button"
						icon="print"
						size="small"
					/>
				</DownloadButton>

				<ResumeContent className="resume-content">
					<ResumeHeader personalInfo={resumeData.personalInfo} />
					<TwoColumnLayout>
						<LeftColumn>
							<ResumeExperience experience={resumeData.experience} />
						</LeftColumn>
						<RightColumn>
							<ResumeExpertise expertise={resumeData.expertise} />
							<ExperienceContinued>Professional Experience Continued</ExperienceContinued>
							<ResumeEducation education={resumeData.education} />
						</RightColumn>
					</TwoColumnLayout>
				</ResumeContent>
			</ResumeContainer>
		</>
	);
};

export default ResumePage;
