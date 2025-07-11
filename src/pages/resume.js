import { useRef } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import resumeData from '../../data/resume_data.json';
import ButtonComponent from '../components/ButtonComponent';
import ResumeHeader from '../components/resume/ResumeHeader';
import ResumeExperience from '../components/resume/ResumeExperience';
import ResumeEducation from '../components/resume/ResumeEducation';
import ResumeExpertise from '../components/resume/ResumeExpertise';

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

		/* Page break controls & Prevent orphaned headings */
		.job,
		.education-item,
		h3,
		small {
			page-break-inside: avoid;
			break-inside: avoid;
		}

		.job:last-child {
			padding-top: 3rem;
		}

		/* Add spacing before major sections */
		section:not(:first-child) {
			margin-top: 2rem;
		}

		.print-button {
			display: none;
		}

		@page {
			size: A4;
			margin: 15mm;
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
	max-width: 800px;
`;

const DownloadButton = styled.div`
	position: absolute;
	top: 2.5rem;
	right: 2.5rem;
	z-index: 10;
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
				<DownloadButton>
					<ButtonComponent
						onClick={handlePrint}
						className="print-button"
						icon="download"
						size="small"
					/>
				</DownloadButton>

				<ResumeContent ref={componentRef} className="resume-content">
					<ResumeHeader personalInfo={resumeData.personalInfo} />
					<ResumeExpertise expertise={resumeData.expertise} />
					<ResumeExperience experience={resumeData.experience} />
					<ResumeEducation education={resumeData.education} />
				</ResumeContent>
			</ResumeContainer>
		</>
	);
};

export default ResumePage;
