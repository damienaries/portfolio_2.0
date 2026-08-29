'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

	return (
		<header className="sticky top-0 z-50 px-6 sm:px-10 lg:px-14 py-4">
			<nav className="glass glass-pill mx-auto flex max-w-4xl items-center gap-1 px-4 py-2">
				<Link
					href="/"
					className="font-mono text-label tracking-[0.14em] uppercase text-ink
					           hover:text-jade transition-colors duration-(--dur-fast)"
				>
					DA
				</Link>

				<ul className="ml-auto flex items-center gap-1 sm:gap-2">
					{LINKS.map(({ href, label }) => {
						const active = pathname === href || pathname.startsWith(href + '/');
						return (
							<li key={href}>
								<Link
									href={href}
									aria-current={active ? 'page' : undefined}
									className={`block px-2 sm:px-3 py-1 font-mono text-label tracking-[0.1em] uppercase
									            transition-colors duration-(--dur-fast)
									            ${active ? 'text-jade' : 'text-muted hover:text-ink'}`}
								>
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
