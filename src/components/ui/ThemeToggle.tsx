'use client';

import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import './ThemeToggle.css';

/**
 * Which icon shows is decided by CSS from `html.dark`, not React state — the
 * pre-paint script sets that class before first frame, so there's no flicker or
 * mismatch. State here is only for the accessible name.
 */
export default function ThemeToggle() {
	const [dark, setDark] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Sync React's copy of the class the pre-paint script already set.
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
		<Button
			variant="glass"
			size="icon"
			onClick={toggle}
			aria-pressed={mounted ? dark : undefined}
			aria-label={mounted ? `Switch to ${dark ? 'light' : 'dark'} theme` : 'Switch theme'}
			title={mounted ? `Switch to ${dark ? 'light' : 'dark'} theme` : 'Switch theme'}
		>
			<span className="theme-icons" aria-hidden="true">
				<FiSun className="theme-icon theme-icon-sun" />
				<FiMoon className="theme-icon theme-icon-moon" />
			</span>
		</Button>
	);
}
