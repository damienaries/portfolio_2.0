import styled from '@emotion/styled';
import { MdEmail } from 'react-icons/md';
import { FaGlobe, FaLinkedin, FaGithub, FaLaptopCode } from 'react-icons/fa';

const Header = styled.header`
	text-align: center;
	margin-bottom: 1.5rem;
`;

const Name = styled.h1`
	font-size: 2.6rem;
	font-weight: 800;
	margin-bottom: 0.7rem;
	color: var(--color-blue-gray);
	letter-spacing: -1px;
`;

const ContactInfo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.6rem;
	flex-wrap: wrap;
	margin-bottom: 1rem;

	@media (min-width: 600px), print {
		flex-wrap: nowrap;
		white-space: nowrap;
		gap: 0.9rem;
	}

	.separator {
		color: var(--color-gray-light);
		font-size: 1.1rem;
		margin: 0 0.07rem;
		user-select: none;
	}

	a {
		display: flex;
		align-items: center;
		gap: 0.22rem;
		color: var(--color-gray-dark);
		text-decoration: none;
		font-size: 0.98rem;
		font-weight: 500;
		transition: color 0.2s ease;

		&:hover {
			color: var(--color-blue-gray);
		}

		svg {
			font-size: 1em;
			margin-bottom: -1px;
		}
	}
`;

const Title = styled.h3`
	color: var(--color-blue-gray);
	margin-bottom: 0.7rem;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 0.25rem;
`;

const TitleIcon = styled(FaLaptopCode)`
	font-size: 1.1rem;
	margin-bottom: -0.15rem;
`;

const Summary = styled.p`
	color: var(--color-gray-dark);
	text-align: left;
`;

const ResumeHeader = ({ personalInfo }) => {
	return (
		<Header>
			<Name>{personalInfo.name}</Name>
			<ContactInfo>
				<a
					href={`mailto:${personalInfo.email}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<MdEmail /> {personalInfo.email}
				</a>
				<span className="separator">|</span>
				<a
					href={`https://${personalInfo.website}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGlobe /> {personalInfo.website}
				</a>
				<span className="separator">|</span>
				<a
					href={`https://${personalInfo.linkedin}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaLinkedin /> LinkedIn
				</a>
				<span className="separator">|</span>
				<a
					href={`https://${personalInfo.github}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGithub /> GitHub
				</a>
			</ContactInfo>
			<Title>
				<TitleIcon />
				{personalInfo.title}
			</Title>
			<Summary>{personalInfo.summary}</Summary>
		</Header>
	);
};

export default ResumeHeader;
