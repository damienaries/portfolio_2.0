'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import DaIceGlyph from '@/components/shell/DaIceGlyph';
import ThemeToggle from '@/components/ui/ThemeToggle';
import './Nav.css';

/**
 * Shell nav. The landing has none — it lives outside the (site) group, so
 * there's no pathname check here.
 *
 * Below `sm` the links collapse behind a hamburger and expand inside the glass
 * bar. See Nav.css for why the bar is out of flow.
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
	const [open, setOpen] = useState(false);
	const shellRef = useRef<HTMLDivElement>(null);

	// Navigating with the panel open would otherwise leave it open on arrival.
	useEffect(() => setOpen(false), [pathname]);

	/* Escape, scroll and an outside press all close it. */
	useEffect(() => {
		if (!open) return;

		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
		const start = window.scrollY;
		const onScroll = () => {
			if (Math.abs(window.scrollY - start) > 80) setOpen(false);
		};

		/* pointerdown, not click — otherwise the dismissing tap also activates
		   whatever is underneath. */
		const onOutside = (e: PointerEvent) => {
			if (!shellRef.current?.contains(e.target as Node)) setOpen(false);
		};

		window.addEventListener('keydown', onKey);
		window.addEventListener('scroll', onScroll, { passive: true });
		document.addEventListener('pointerdown', onOutside);
		return () => {
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('scroll', onScroll);
			document.removeEventListener('pointerdown', onOutside);
		};
	}, [open]);

	/* Flags input on <html> so the logo's ice only moves while the visitor does.
	   classList rather than state — pointermove fires far too often to re-render. */
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

		/* One burst on load, otherwise a still cursor means it never animates. */
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

	const linkClass = (href: string) => {
		const active = pathname === href || pathname.startsWith(href + '/');
		return `shimmer-text block font-mono text-label tracking-widest uppercase
		        transition-colors duration-(--dur-fast)
		        ${active ? 'text-jade' : 'text-muted hover:text-ink'}`;
	};

	const isActive = (href: string) =>
		pathname === href || pathname.startsWith(href + '/');

	return (
		<header className="site-nav sticky top-0 z-50 px-6 sm:px-10 lg:px-14 py-4">
			{/* Reserves the closed height; the bar is out of flow. */}
			<div ref={shellRef} className="nav-reserve mx-auto max-w-4xl">
				<nav
					className="nav-shell glass px-4 py-2"
					data-open={open}
					aria-label="Main">
					<div className="flex items-center gap-1">
						<Link href="/" className="shrink-0">
							<DaIceGlyph size={50} />
							<span className="sr-only">Damien Aries — home</span>
						</Link>

						{/* Mobile trigger */}
						<button
							type="button"
							onClick={() => setOpen((v) => !v)}
							aria-expanded={open}
							aria-controls="nav-panel"
							aria-label={open ? 'Close menu' : 'Open menu'}
							className="ml-auto grid cursor-pointer place-items-center p-2 text-muted
							           transition-colors duration-(--dur-fast) hover:text-ink sm:hidden">
							<span className="nav-burger">
								<span className="nav-burger-bar" />
								<span className="nav-burger-bar" />
								<span className="nav-burger-bar" />
							</span>
						</button>

						{/* Desktop links */}
						<ul className="ml-auto hidden items-center gap-2 sm:flex">
							{LINKS.map(({ href, label }) => (
								<li key={href}>
									<Link
										href={href}
										aria-current={isActive(href) ? 'page' : undefined}
										className={`${linkClass(href)} px-3 py-1`}>
										{label}
									</Link>
								</li>
							))}
							<li className="flex items-center">
								<ThemeToggle />
							</li>
						</ul>
					</div>

					{/* In flow inside the bar, so the bar's glass covers it. */}
					<div id="nav-panel" className="nav-panel sm:hidden">
						<div>
							<ul className="flex flex-col gap-1 pt-3 pb-1">
								{LINKS.map(({ href, label }) => (
									<li key={href}>
										<Link
											href={href}
											aria-current={isActive(href) ? 'page' : undefined}
											tabIndex={open ? undefined : -1}
											className={`${linkClass(href)} py-2`}>
											{label}
										</Link>
									</li>
								))}
								<li className="pt-2">
									<ThemeToggle />
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
}
