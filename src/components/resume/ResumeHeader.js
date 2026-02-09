import styled from '@emotion/styled';

const Header = styled.header`
	position: relative;
	margin-bottom: 1.5rem;
`;

const HeaderTop = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 1rem;
	margin-top: 0;
	padding-top: 0;
`;

const HeaderLeft = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	position: relative;
	padding-left: 0.5rem;

	@media print {
		padding-left: 0;
	}
`;

const Name = styled.h1`
	font-size: 3rem;
	font-weight: 800;
	color: var(--color-gray-dark);
	letter-spacing: 0.5px;
	text-transform: uppercase;
	line-height: 1.2;
`;

const Title = styled.div`
	font-size: 0.75rem;
	color: rgba(30, 35, 41, 0.75);
	text-transform: uppercase;
	letter-spacing: 0.5px;
	font-weight: 700;
	line-height: 1.4;
`;

const ContactBox = styled.div`
	background-color: var(--color-gray-dark);
	color: white;
	padding: 1rem 2rem 1rem 1rem;
	min-width: 200px;
	font-size: 0.85rem;
	display: flex;
	flex-direction: column;
	margin-top: 0;
	margin-bottom: 0;
	align-self: flex-start;
	position: relative;
	z-index: 1;

	@media print {
		background-color: var(--color-gray-dark) !important;
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		padding-top: 1rem;
		margin-top: 0;
		margin-bottom: 0;
	}

	a {
		color: white;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
`;

const ContactLine = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const ContactLabel = styled.span`
	font-weight: 600;
	min-width: 1.5rem;
`;

const ContactValue = styled.span`
	flex: 1;
`;

const ContactSeparator = styled.span`
	margin: 0 0.25rem;
`;

const SummaryTitle = styled.h3``;

const Summary = styled.p`
	color: var(--color-gray-dark);
	text-align: left;
	font-size: 0.95rem;
	margin: 0;
`;

const ResumeHeader = ({ personalInfo }) => {
	return (
		<Header>
			<HeaderTop>
				<HeaderLeft>
					<Name>{personalInfo.name.toUpperCase()}</Name>
					<Title>{personalInfo.title.toUpperCase()}</Title>
				</HeaderLeft>
				<ContactBox>
					<ContactLine>
						<ContactLabel>E:</ContactLabel>
						<ContactValue>
							<a
								href={`mailto:${personalInfo.email}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{personalInfo.email}
							</a>
						</ContactValue>
					</ContactLine>
					<ContactLine>
						<ContactLabel>W:</ContactLabel>
						<ContactValue>
							<a
								href={`https://${personalInfo.website}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{personalInfo.website}
							</a>
						</ContactValue>
					</ContactLine>
					<ContactLine>
						<ContactLabel>P:</ContactLabel>
						<ContactValue>
							<a href="tel:9179211162">(917) 921-1162</a>
						</ContactValue>
					</ContactLine>
					<ContactLine>
						<ContactLabel>S:</ContactLabel>
						<ContactValue>
							<a
								href={`https://${personalInfo.linkedin}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								LinkedIn
							</a>
							<ContactSeparator>|</ContactSeparator>
							<a
								href={`https://${personalInfo.github}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								GitHub
							</a>
						</ContactValue>
					</ContactLine>
				</ContactBox>
			</HeaderTop>
			<SummaryTitle>Summary</SummaryTitle>
			<Summary>{personalInfo.summary}</Summary>
		</Header>
	);
};

export default ResumeHeader;
