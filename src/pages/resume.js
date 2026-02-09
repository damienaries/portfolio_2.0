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
			padding: 0;
			margin: 0;
		}

		.top-bar,
		.left-bar {
			visibility: visible;
		}

		.resume-content {
			visibility: visible;
			position: absolute;
			inset: 0;
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

		/* Prevent orphaned headings  */
		.education-item,
		h3:not(.experience-continued),
		small {
			break-inside: avoid;
		}

		.education-section {
			page-break-before: always;
			break-before: page;
		}

		.experience-continued {
			page-break-before: always;
			break-before: page;
			margin-top: 0;
			padding-top: 0;
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
	max-width: 800px;
	${breathingCardEffect}
`;

const TopBar = styled.div`
	position: absolute;
	top: 2rem;
	right: 3rem;
	height: 1.1rem;
	width: 237.5px;
	background-color: var(--color-gray-dark);
	z-index: 10;

	@media print {
		top: 0rem;
		right: 1rem;
	}
`;

const LeftBar = styled.div`
	position: absolute;
	left: 2rem;
	top: 5rem;
	height: 80px;
	width: 0.75rem;
	background-color: var(--color-gray-dark);
	z-index: 10;

	@media print {
		left: -0.75rem;
		top: 3rem;
	}
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
			<ResumeContainer ref={contentRef} className="resume-container">
				<DownloadButton>
					<ButtonComponent
						onClick={reactToPrintFn}
						className="print-button"
						icon="print"
						size="small"
					/>
				</DownloadButton>
				<TopBar className="top-bar">&nbsp;</TopBar>
				<LeftBar className="left-bar">&nbsp;</LeftBar>
				<ResumeContent className="resume-content">
					<ResumeHeader personalInfo={resumeData.personalInfo} />
					<TwoColumnLayout>
						<LeftColumn>
							<ResumeExperience experience={resumeData.experience} />
						</LeftColumn>
						<RightColumn>
							<ResumeExpertise expertise={resumeData.expertise} />
							<ResumeEducation education={resumeData.education} />
						</RightColumn>
					</TwoColumnLayout>
				</ResumeContent>
			</ResumeContainer>
		</>
	);
};

export default ResumePage;
