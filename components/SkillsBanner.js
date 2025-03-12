import styled from '@emotion/styled';
import {
	SiAmazonaws,
	SiCss3,
	SiFigma,
	SiFirebase,
	SiJavascript,
	SiLaravel,
	SiMongodb,
	SiMui,
	SiNextdotjs,
	SiNodedotjs,
	SiPhp,
	SiReact,
	SiStyledcomponents,
	SiTailwindcss,
	SiTypescript,
	SiVuedotjs,
} from 'react-icons/si';

export default function SkillsBanner() {
	return (
		<StyledSkills>
			{/* <span className="skill-scrolling">
				<SiJavascript className="skill" />
				<SiTypescript className="skill" />
				<SiPhp className="skill" />
				<SiVuedotjs className="skill" />
				<SiLaravel className="skill" />
				<SiReact className="skill" />
				<SiNextdotjs className="skill" />
				<SiCss3 className="skill" />
				<SiTailwindcss className="skill" />
				<SiMui className="skill" />
				<SiStyledcomponents className="skill" />
				<SiAmazonaws className="skill" />
				<SiMongodb className="skill" />
				<SiFirebase className="skill" />
				<SiNodedotjs className="skill" />
				<SiFigma className="skill" />
			</span> */}

			{/* <span className="skill-scrolling">
				<SiJavascript className="skill" />
				<SiTypescript className="skill" />
				<SiPhp className="skill" />
				<SiVuedotjs className="skill" />
				<SiLaravel className="skill" />
				<SiReact className="skill" />
				<SiNextdotjs className="skill" />
				<SiCss3 className="skill" />
				<SiTailwindcss className="skill" />
				<SiMui className="skill" />
				<SiStyledcomponents className="skill" />
				<SiAmazonaws className="skill" />
				<SiMongodb className="skill" />
				<SiFirebase className="skill" />
				<SiNodedotjs className="skill" />
				<SiFigma className="skill" />
			</span> */}
		</StyledSkills>
	);
}

const StyledSkills = styled.aside`
	@media screen and (max-width: 768px) {
		display: none;
	}

	display: flex;
	flex-direction: column;
	width: 100px;
	position: fixed;
	height: 100%;
	padding: 0 2rem;
	margin: 0 4rem 0 0;
	background-color: ${(props) => props.theme.cardBackground};
	overflow: hidden;
	box-shadow: 0 0 5px 10px ${(props) => props.theme.cardBackground};

	.skill-scrolling {
		animation: scroll 120s linear infinite alternate;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.skill {
		font-size: 5rem;
		margin: 2rem;
	}

	@keyframes scroll {
		0% {
			transform: translate3d(0, 0, 0);
		}
		100% {
			transform: translate3d(0, -100%, 0);
		}
	}
`;
