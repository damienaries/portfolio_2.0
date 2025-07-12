import styled from '@emotion/styled';
import {
	SiReact,
	SiNextdotjs,
	SiJavascript,
	SiTypescript,
	SiNodedotjs,
	SiPython,
	SiDjango,
	SiPostgresql,
	SiMongodb,
	SiTailwindcss,
	SiCss3,
	SiHtml5,
	SiGit,
	SiFirebase,
	SiGraphql,
	SiRedux,
	SiMaterialui,
	SiStyledcomponents,
	SiCodeigniter,
	SiLaravel,
	SiVuedotjs,
	SiPhp,
	SiNpm,
	SiShopify,
} from 'react-icons/si';
import { FaDatabase } from 'react-icons/fa';

export default function TechPill({ technology }) {
	// Map of technology names to their corresponding icons
	const techIcons = {
		React: SiReact,
		'Next.js': SiNextdotjs,
		JavaScript: SiJavascript,
		TypeScript: SiTypescript,
		'Node.js': SiNodedotjs,
		Python: SiPython,
		Django: SiDjango,
		PostgreSQL: SiPostgresql,
		MongoDB: SiMongodb,
		'Tailwind CSS': SiTailwindcss,
		Tailwind: SiTailwindcss,
		CSS: SiCss3,
		HTML: SiHtml5,
		Git: SiGit,
		Firebase: SiFirebase,
		GraphQL: SiGraphql,
		Redux: SiRedux,
		'Material-UI': SiMaterialui,
		'Styled Components': SiStyledcomponents,
		Laravel: SiLaravel,
		Vue: SiVuedotjs,
		'Vue.js': SiVuedotjs,
		PHP: SiPhp,
		Dexie: FaDatabase,
		Npm: SiNpm,
		Shopify: SiShopify,
	};

	const Icon = techIcons[technology] || SiCodeigniter;

	return (
		<StyledTechPill>
			<Icon className="icon" />
			<span className="tooltip">{technology}</span>
		</StyledTechPill>
	);
}

const StyledTechPill = styled.div`
	padding: 0.2rem;
	margin: 0.5rem;
	border-radius: 50%;
	background-image: ${(props) => props.theme.techPillGradient};
	box-shadow: ${(props) => props.theme.boxShadow};
	position: relative;
	transition: transform 0.2s ease;
	color: ${(props) => props.theme.text};
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;

	.icon {
		font-size: 1.5rem;
	}

	@media screen and (min-width: 768px) {
		margin: 0.25rem;
		width: 28px;
		height: 28px;

		.icon {
			font-size: 1rem;
		}
	}

	&:hover {
		transform: translateY(-2px);

		.tooltip {
			opacity: 1;
			visibility: visible;
		}
	}

	.tooltip {
		position: absolute;
		top: -25px;
		left: 50%;
		transform: translateX(-50%);
		background-color: ${(props) => props.theme.cardBackground};
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.875rem;
		white-space: nowrap;
		opacity: 0;
		visibility: hidden;
		transition: all 0.2s ease;
		box-shadow: ${(props) => props.theme.boxShadow};
		z-index: 1;

		&::after {
			content: '';
			position: absolute;
			bottom: -5px;
			left: 50%;
			transform: translateX(-50%);
			border-width: 5px 5px 0;
			border-style: solid;
			border-color: ${(props) => props.theme.cardBackground} transparent
				transparent;
		}
	}
`;
