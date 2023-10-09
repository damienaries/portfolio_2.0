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
	SiVuedotjs
} from 'react-icons/si';

// Todo 
// block scroll? hide scrollbar, or fix empty space on the right
// blur border edges 
export default function SkillsBanner() {
	return (
		<StyledSkills>
			<span className="skill-scrolling">
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
			</span>

			<span className="skill-scrolling">
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
			</span>
		</StyledSkills>
	);
}

const StyledSkills = styled.ul`
	display: flex;
	width: 100%;
	padding: 2rem;
	margin: 2rem 0 8rem;
	line-height: 2;
	background-color: ${(props) => props.theme.cardBackground};
	overflow-x: scroll;

	.skill-scrolling {
		animation: scroll 90s linear infinite;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.skill {
		font-size: 10rem;
		margin: 2rem;

		&:hover {
			color: var(--color-blue-dark);
			filter: drop-shadow(0 0.25rem 0.5rem var(--color-white));
		}
	}

	@keyframes scroll {
		0% {
			transform: translate3d(0, 0, 0);
		}
		100% {
			transform: translate3d(-100%, 0, 0);
		}
	}
`;
