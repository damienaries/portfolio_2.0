import Link from 'next/link';

/**
 * The one button in the new UI.
 *
 * Replaces nothing — the old Emotion ButtonComponent (202 lines) is still used
 * by the legacy pages and dies with them. This exists because the landing Enter
 * and the contact Send had drifted into sharing 13 classes plus an inline
 * boxShadow by copy-paste, and the glass pair shared another set. Two variants
 * cover every button on the site.
 *
 * Renders the right element for the job rather than taking an `as` prop: an
 * internal href gets next/link, an external one gets a plain anchor with the
 * rel guard, and no href gets a <button>. That means callers can't accidentally
 * ship a <button> that should have been a link.
 */

type Variant = 'solid' | 'glass';
type Size = 'md' | 'lg';

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

/* Shared by both variants. Motion tokens and the label treatment live here so a
   new button can't quietly pick different ones. */
const BASE =
	'shimmer inline-flex items-center justify-center font-mono text-label uppercase ' +
	'transition-transform duration-(--dur-fast) ease-(--ease) ' +
	'hover:-translate-y-px active:translate-y-0';

/* Padding is a prop, not something callers pass through className. Passing
   `px-8` alongside the variant's `px-7` leaves both in the class list, and
   Tailwind can't resolve that — same specificity, so stylesheet order decides
   and the result is a coin flip. */
const SIZES: Record<Variant, Record<Size, string>> = {
	solid: { md: 'px-7 py-3', lg: 'px-8 py-3.5' },
	glass: { md: 'px-4 py-1.5', lg: 'px-5 py-2' },
};

const VARIANTS: Record<Variant, string> = {
	// Primary CTA. --edge and --lift come from the material tokens, so the
	// button carries the same specular edge as every glass surface.
	solid:
		'rounded-full bg-jade text-on-jade tracking-caps ' +
		'shadow-[var(--edge),var(--lift)] ' +
		'disabled:cursor-not-allowed disabled:opacity-60',
	// Secondary. Inherits blur and edge from .glass; strength is pre-tuned by
	// `.glass.shimmer` so the sheen doesn't blow out a light surface.
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
