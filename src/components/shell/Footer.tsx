import Link from 'next/link';

const ELSEWHERE = [
	{ href: 'mailto:damien@damienaries.com', label: 'Email' },
	{ href: 'https://github.com/damienaries', label: 'GitHub', external: true },
	{
		href: 'https://linkedin.com/in/damienaries',
		label: 'LinkedIn',
		external: true,
	},
];

export default function Footer() {
	return (
		<footer className="mt-24 border-t border-line px-6 sm:px-10 lg:px-14 py-8">
			<div
				className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-3
			                font-mono text-label tracking-[0.12em] uppercase text-muted">
				{ELSEWHERE.map(({ href, label, external }) => (
					<a
						key={label}
						href={href}
						{...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
						className="hover:text-ink transition-colors duration-(--dur-fast)">
						{label}
					</a>
				))}

				<Link
					href="/"
					className="ml-auto hover:text-ink transition-colors duration-(--dur-fast)">
					Back to the front
				</Link>
			</div>
		</footer>
	);
}
