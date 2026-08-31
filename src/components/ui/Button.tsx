import Link from 'next/link';

/**
 * Every button on the site. Two variants, three sizes.
 *
 * Picks its own element instead of taking an `as` prop: internal href →
 * next/link, external → anchor, no href → button. Callers can't ship a
 * <button> that should have been a link.
 */

type Variant = 'solid' | 'glass';
type Size = 'md' | 'lg' | 'icon';

type Common = {
	variant?: Variant;
	size?: Size;
	className?: string;
	children: React.ReactNode;
};

type Props = Common &
	(
		| ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>)
		| ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>)
	);

/* Shared, so a new button can't pick different motion or label treatment. */
const BASE =
	'shimmer inline-flex items-center justify-center font-mono text-label uppercase leading-none ' +
	'transition-transform duration-(--dur-fast) ease-(--ease) ' +
	'hover:-translate-y-px active:translate-y-0';

/* Padding is a prop, not a className override: `px-8` passed alongside the
   variant's `px-7` leaves both in the list, and Tailwind can't resolve a tie. */
const SIZES: Record<Variant, Record<Size, string>> = {
	solid: { md: 'px-7 py-3', lg: 'px-8 py-3.5', icon: 'p-2' },
	// `icon` is equal padding, so a pill radius resolves to a circle.
	glass: { md: 'px-4 py-1.5', lg: 'px-5 py-2', icon: 'p-2' },
};

const VARIANTS: Record<Variant, string> = {
	// --edge/--lift are the shared material tokens.
	solid:
		'rounded-full bg-jade text-on-jade tracking-caps ' +
		'shadow-[var(--edge),var(--lift)] ' +
		'disabled:cursor-not-allowed disabled:opacity-60',
	// .glass.shimmer pre-tunes the sheen so it doesn't blow out a light surface.
	glass:
		'glass glass-pill tracking-widest text-muted hover:text-ink ' +
		'transition-colors disabled:cursor-not-allowed disabled:opacity-60',
};

export default function Button({
	variant = 'solid',
	size = 'md',
	className = '',
	children,
	...rest
}: Props) {
	const cls = `${BASE} ${VARIANTS[variant]} ${SIZES[variant][size]} ${className}`
		.replace(/\s+/g, ' ')
		.trim();

	if ('href' in rest && rest.href) {
		const { href, ...anchor } = rest as { href: string };
		const external = /^(https?:|mailto:|tel:)/.test(href);

		if (external) {
			return (
				<a href={href} rel="noreferrer" className={cls} {...anchor}>
					{children}
				</a>
			);
		}
		return (
			<Link href={href} className={cls} {...anchor}>
				{children}
			</Link>
		);
	}

	const button = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
	return (
		<button type={button.type ?? 'button'} className={`cursor-pointer ${cls}`} {...button}>
			{children}
		</button>
	);
}
