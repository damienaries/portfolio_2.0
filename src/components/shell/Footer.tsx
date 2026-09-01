import Link from 'next/link';

const ELSEWHERE = [
	{ href: 'mailto:damien.aries@gmail.com', label: 'Email' },
	{ href: 'https://github.com/damienaries', label: 'GitHub', external: true },
	{
		href: 'https://linkedin.com/in/damienaries',
		label: 'LinkedIn',
		external: true,
	},
];

/**
 * Two groups, not one wrapping row.
 *
 * Mobile stacks them centred; from `sm` they sit on one line, external links
 * left and the home link right. A single flex-wrap row can't do both — items
 * that wrap inherit the row's alignment, so "centred when stacked, opposed when
 * inline" needs the groups to be separate boxes.
 */
export default function Footer() {
	return (
		<footer className="site-footer mt-24 border-t border-line px-6 sm:px-10 lg:px-14 py-8">
			<div
				className="mx-auto flex max-w-4xl flex-col items-center gap-4
				           font-mono text-label tracking-widest uppercase text-muted
				           sm:flex-row sm:justify-between sm:gap-6">
				<ul className="flex items-center justify-center gap-x-6 gap-y-2">
					{ELSEWHERE.map(({ href, label, external }) => (
						<li key={label}>
							<a
								href={href}
								{...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
								className="shimmer-text hover:text-ink transition-colors duration-(--dur-fast)">
								{label}
							</a>
						</li>
					))}
				</ul>

				<Link
					href="/"
					className="shimmer-text hover:text-ink transition-colors duration-(--dur-fast)">
					Back to one
				</Link>
			</div>
		</footer>
	);
}
