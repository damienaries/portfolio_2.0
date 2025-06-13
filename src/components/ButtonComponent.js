import styled from '@emotion/styled';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { MdOpenInNew, MdArrowForward } from 'react-icons/md';

const iconMap = {
	github: FaGithub,
	external: MdOpenInNew,
	'arrow-right': MdArrowForward,
};

export default function ButtonComponent({
	children,
	href,
	onClick,
	variant = 'secondary',
	icon,
	className,
}) {
	const IconComponent = icon ? iconMap[icon] : null;

	const buttonContent = (
		<StyledButton
			as={href ? undefined : 'button'}
			onClick={onClick}
			variant={variant}
			className={className}
		>
			{children}
			{IconComponent && <IconComponent className="icon" />}
		</StyledButton>
	);

	if (href) {
		if (href.startsWith('/')) {
			return <Link href={href}>{buttonContent}</Link>;
		}
		return (
			<a href={href} target="_blank" rel="noopener noreferrer">
				{buttonContent}
			</a>
		);
	}

	return buttonContent;
}

const StyledButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: var(--size-body);
	padding: 0.75rem 1.5rem;
	border-radius: var(--radius);
	border: none;
	cursor: pointer;
	transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	box-shadow: ${(props) => props.theme.boxShadow};

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
		margin-left: 0.5rem;
		font-size: 1.2em;
	}
`;
