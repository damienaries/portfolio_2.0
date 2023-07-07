import styled from '@emotion/styled';
import {
	SiAmazonaws,
	SiCss3,
	SiFigma,
	SiFirebase,
	SiHtml5,
	SiJavascript,
	SiMongodb,
	SiMui,
	SiNextdotjs,
	SiNodedotjs,
	SiReact,
	SiStyledcomponents,
	SiTailwindcss,
	SiTypescript,
} from 'react-icons/si';

export default function SkillsBanner() {
	return (
		<StyledSkills>
			<span className="skill-scrolling">
				<SiHtml5 className="skill" />
				<SiCss3 className="skill" />
				<SiJavascript className="skill" />
				<SiTypescript className="skill" />
				<SiReact className="skill" />
				<SiNextdotjs className="skill" />
				<SiMui className="skill" />
				<SiTailwindcss className="skill" />
				<SiStyledcomponents className="skill" />
				<SiFigma className="skill" />
				<SiAmazonaws className="skill" />
				<SiMongodb className="skill" />
				<SiFirebase className="skill" />
				<SiNodedotjs className="skill" />
			</span>

			<span className="skill-scrolling">
				<SiHtml5 className="skill" />
				<SiCss3 className="skill" />
				<SiJavascript className="skill" />
				<SiTypescript className="skill" />
				<SiReact className="skill" />
				<SiNextdotjs className="skill" />
				<SiMui className="skill" />
				<SiTailwindcss className="skill" />
				<SiStyledcomponents className="skill" />
				<SiFigma className="skill" />
				<SiAmazonaws className="skill" />
				<SiMongodb className="skill" />
				<SiFirebase className="skill" />
				<SiNodedotjs className="skill" />
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
	background-color: var(--color-blue-light);
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
