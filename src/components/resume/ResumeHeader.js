import styled from '@emotion/styled';
import { MdEmail } from 'react-icons/md';
import { FaGlobe, FaLinkedin, FaGithub } from 'react-icons/fa';

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

const ResumeHeader = ({ personalInfo }) => {
	return (
		<Header>
			<Name>{personalInfo.name}</Name>
			<ContactInfo>
				<a
					href={`https://${personalInfo.website}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGlobe />
					<small>{personalInfo.website}</small>
				</a>
				<a
					href={`https://${personalInfo.linkedin}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaLinkedin />
					<small>{personalInfo.linkedin}</small>
				</a>
				<a
					href={`https://${personalInfo.github}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGithub />
					<small>{personalInfo.github}</small>
				</a>
				<a href={`mailto:${personalInfo.email}`}>
					<MdEmail />
					<small>{personalInfo.email}</small>
				</a>
			</ContactInfo>
			<Title>{personalInfo.title}</Title>
			<Summary>{personalInfo.summary}</Summary>
		</Header>
	);
};

export default ResumeHeader;
