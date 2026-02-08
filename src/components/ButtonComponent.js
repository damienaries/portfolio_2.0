import styled from '@emotion/styled';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { MdOpenInNew, MdArrowForward, MdDownload, MdPrint } from 'react-icons/md';

const iconMap = {
	github: FaGithub,
	external: MdOpenInNew,
	'arrow-right': MdArrowForward,
	download: MdDownload,
	print: MdPrint,
};

export default function ButtonComponent({
	children,
	href,
	onClick,
	variant = 'secondary',
	icon,
	className,
	size = 'default',
}) {
	const IconComponent = icon ? iconMap[icon] : null;
	const hasText =
		typeof children === 'string' ||
		(Array.isArray(children) &&
			children.some((child) => typeof child === 'string'));

	if (href) {
		if (href.startsWith('/')) {
			// Internal link - use Next.js Link (new API)
			return (
				<Link
					href={href}
					onClick={onClick}
					className={className}
					style={{ textDecoration: 'none', display: 'inline-block' }}
				>
					<StyledButton
						as="span"
						variant={variant}
						size={size}
						hasText={hasText}
					>
						{children}
						{IconComponent && <IconComponent className="icon" />}
					</StyledButton>
				</Link>
			);
		}
		// External link - styled component IS the anchor
		return (
			<StyledButton
				as="a"
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				onClick={onClick}
				variant={variant}
				size={size}
				hasText={hasText}
				className={className}
			>
				{children}
				{IconComponent && <IconComponent className="icon" />}
			</StyledButton>
		);
	}

	// No href - regular button
	return (
		<StyledButton
			as="button"
			onClick={onClick}
			variant={variant}
			size={size}
			hasText={hasText}
			className={className}
		>
			{children}
			{IconComponent && <IconComponent className="icon" />}
		</StyledButton>
	);
}

const StyledButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: var(--text-body);
	padding: 0.75rem 1.5rem;
	border-radius: var(--radius);
	border: none;
	cursor: pointer;
	transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	box-shadow: ${(props) => props.theme.boxShadow};

	${(props) =>
		props.size === 'small' &&
		`
		font-size: 0.75em;
		padding: 0.5625rem 1.125rem;
	`}

	${(props) =>
		props.size === 'small' &&
		!props.hasText &&
		`
		padding: 0.5rem;
		min-width: 2.5rem;
		min-height: 2.5rem;
	`}

	${(props) =>
		props.variant === 'primary'
			? `
		background-image: ${props.theme.techPillGradient};
		color: ${props.theme.text};
		
		&:hover {
			background-image: linear-gradient(
				to bottom right,
				${
					props.theme.background === 'var(--color-white)'
						? 'var(--color-accent)'
						: 'var(--color-white-dark)'
				},
				${
					props.theme.background === 'var(--color-white)'
						? 'var(--color-accent-2)'
						: 'var(--color-gray-light)'
				}
			);
		}
	`
			: `
		background-image: linear-gradient(
			to bottom right,
			${
				props.theme.background === 'var(--color-white)'
					? 'var(--color-white-dark)'
					: 'var(--color-gray-dark)'
			},
			${
				props.theme.background === 'var(--color-white)'
					? 'var(--color-gray-light)'
					: 'var(--color-gray-light)'
			}
		);
		color: ${props.theme.text};
		opacity: 0.9;
		
		&:hover {
			opacity: 1;
			background-image: linear-gradient(
				to bottom right,
				${
					props.theme.background === 'var(--color-white)'
						? 'var(--color-gray-light)'
						: 'var(--color-gray-light)'
				},
				${
					props.theme.background === 'var(--color-white)'
						? 'var(--color-white-dark)'
						: 'var(--color-gray-dark)'
				}
			);
		}
	`}

	.icon {
		margin-left: ${(props) => (props.hasText ? '0.2rem' : '0')};
		font-size: 1.4rem;
	}
`;
