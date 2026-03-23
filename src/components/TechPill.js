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
	SiMaterialdesign,
	SiStyledcomponents,
	SiCodeigniter,
	SiLaravel,
	SiVuedotjs,
	SiPhp,
	SiNpm,
	SiShopify,
	SiNuxtdotjs,
} from 'react-icons/si';
import { FaDatabase } from 'react-icons/fa';
import {
	SPOTLIGHT_DURATION,
	SPOTLIGHT_EASING,
	spotlightSweep,
} from '../styles/spotlightHover';

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
		'Material-UI': SiMaterialdesign,
		'Styled Components': SiStyledcomponents,
		Laravel: SiLaravel,
		Vue: SiVuedotjs,
		'Vue.js': SiVuedotjs,
		PHP: SiPhp,
		Dexie: FaDatabase,
		Npm: SiNpm,
		Shopify: SiShopify,
		Nuxt: SiNuxtdotjs,
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
	transition: box-shadow 0.35s ease;
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
		animation: ${(props) => spotlightSweep(props.theme.boxShadow)}
			${SPOTLIGHT_DURATION} ${SPOTLIGHT_EASING} forwards;

		.tooltip {
			opacity: 1;
			visibility: visible;
			transition-delay: ${SPOTLIGHT_DURATION};
		}

		@media (prefers-reduced-motion: reduce) {
			animation: none;
			box-shadow:
				${(props) => props.theme.boxShadow},
				0 4px 8px rgba(255, 255, 255, 0.45);

			.tooltip {
				transition-delay: 0s;
			}
		}
	}

	.tooltip {
		position: absolute;
		bottom: -140%;
		left: 75%;
		background-color: ${(props) => props.theme.cardBackground};
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.875rem;
		white-space: nowrap;
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.2s ease,
			visibility 0.2s ease;
		transition-delay: 0.2s;
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
