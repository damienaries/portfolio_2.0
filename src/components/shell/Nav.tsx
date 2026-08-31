'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import DaIceGlyph from '@/components/shell/DaIceGlyph';
import ThemeToggle from '@/components/ui/ThemeToggle';

/**
 * Site shell nav. Deliberately small — the old site's Navbar was 465 lines
 * doing nav, theme, a contact popover and a mobile drawer in one file.
 *
 * The landing has no nav at all; it lives outside the (site) route group, so
 * there's no pathname check here.
 */

const LINKS = [
	{ href: '/work', label: 'Work' },
	{ href: '/about', label: 'About' },
	{ href: '/contact', label: 'Contact' },
	{ href: '/resume', label: 'Résumé' },
];

export default function Nav() {
	// usePathname is typed nullable for the pages-router compat shim.
	const pathname = usePathname() ?? '';

	/* Flag real input on <html> so the logo's ice only moves while the visitor
	   does. Deliberately classList rather than state: pointermove fires dozens
	   of times a second and re-rendering the nav on each one would be absurd for
	   a decorative animation. */
	useEffect(() => {
		const root = document.documentElement;
		let idle: number | undefined;

		const wake = () => {
			root.classList.add('input-active');
			if (idle) window.clearTimeout(idle);
			idle = window.setTimeout(
				() => root.classList.remove('input-active'),
				700,
			);
		};

		/* Run once on load so the ice is visibly moving when the page arrives —
		   a static glass gives no hint that it ever animates. Any real input
		   after this hands over to the 700ms idle behaviour above. */
		root.classList.add('input-active');
		idle = window.setTimeout(() => root.classList.remove('input-active'), 2600);

		const opts = { passive: true } as const;
		window.addEventListener('pointermove', wake, opts);
		window.addEventListener('scroll', wake, opts);
		window.addEventListener('touchmove', wake, opts);

		return () => {
			window.removeEventListener('pointermove', wake);
			window.removeEventListener('scroll', wake);
			window.removeEventListener('touchmove', wake);
			if (idle) window.clearTimeout(idle);
			root.classList.remove('input-active');
		};
	}, []);

	return (
		<header className="site-nav sticky top-0 z-50 px-6 sm:px-10 lg:px-14 py-4">
			<nav className="glass glass-pill mx-auto flex max-w-4xl items-center gap-1 px-4 py-2">
				<Link
					href="/"
					className="shimmer-text font-mono text-label tracking-caps uppercase text-ink
					           hover:text-jade transition-colors duration-(--dur-fast)">
					<DaIceGlyph size={50} />
					<span className="sr-only">Damien Aries — home</span>
				</Link>

				<ul className="ml-auto flex items-center gap-1 sm:gap-2">
					{LINKS.map(({ href, label }) => {
						const active = pathname === href || pathname.startsWith(href + '/');
						return (
							<li key={href}>
								<Link
									href={href}
									aria-current={active ? 'page' : undefined}
									className={`shimmer-text block px-2 sm:px-3 py-1 font-mono text-label tracking-widest uppercase
									            transition-colors duration-(--dur-fast)
									            ${active ? 'text-jade' : 'text-muted hover:text-ink'}`}>
									{label}
								</Link>
							</li>
						);
					})}
					<li className="pl-1">
						<ThemeToggle />
					</li>
				</ul>
			</nav>
		</header>
	);
}
