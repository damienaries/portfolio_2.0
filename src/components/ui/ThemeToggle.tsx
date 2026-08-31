'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
	const [dark, setDark] = useState(false);
	const [mounted, setMounted] = useState(false);

	// The inline script in layout.tsx already applied the class before paint;
	// this only syncs React's copy of that state.
	useEffect(() => {
		setDark(document.documentElement.classList.contains('dark'));
		setMounted(true);
	}, []);

	const toggle = () => {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle('dark', next);
		try {
			localStorage.setItem('theme', next ? 'dark' : 'light');
		} catch {
			/* private browsing — the class still applies for this session */
		}
	};

	return (
		<button
			type="button"
			onClick={toggle}
			aria-pressed={dark}
			aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}
			className="cursor-pointer shimmer glass font-mono text-label tracking-widest uppercase text-muted
			           hover:text-ink transition-colors px-3 py-1.5 glass-pill"
		>
			{/* Render a stable label until mounted so SSR and client agree. */}
			<span suppressHydrationWarning>{mounted ? (dark ? 'Light' : 'Dark') : 'Theme'}</span>
		</button>
	);
}
