import styled from '@emotion/styled';
import ButtonComponent from './ButtonComponent';

export default function CodeLinks({ githubLink, liveLink }) {
	return (
		<StyledLinks>
			{githubLink && (
				<ButtonComponent href={githubLink} icon="github">
					Code
				</ButtonComponent>
			)}
			{liveLink && (
				<ButtonComponent href={liveLink} icon="external">
					Site
				</ButtonComponent>
			)}
		</StyledLinks>
	);
}

const StyledLinks = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 1rem;

	@media screen and (max-width: 600px) {
		padding: 1rem 0;
	}
`;
