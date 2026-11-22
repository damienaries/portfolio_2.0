'use client';

import { useSyncExternalStore } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import './ThemeToggle.css';

// The pre-paint script owns the initial theme. Subscribe to its DOM state so
// desktop and mobile toggles also stay in sync with one another.
function subscribeToTheme(onChange: () => void) {
	const observer = new MutationObserver(onChange);
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['class'],
	});
	return () => observer.disconnect();
}

function getThemeSnapshot() {
	return document.documentElement.classList.contains('dark');
}

// The server cannot read the browser preference. Use a neutral accessible name
// for server rendering and hydration; CSS selects the icon without a flash.
function getServerThemeSnapshot(): undefined {
	return undefined;
}

export default function ThemeToggle() {
	const dark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
	const label = dark === undefined ? 'Switch theme' : `Switch to ${dark ? 'light' : 'dark'} theme`;

	const toggle = () => {
		const next = !getThemeSnapshot();
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
			aria-pressed={dark}
			aria-label={label}
			title={label}
		>
			<span className="theme-icons" aria-hidden="true">
				<FiSun className="theme-icon theme-icon-sun" />
				<FiMoon className="theme-icon theme-icon-moon" />
			</span>
		</Button>
	);
}
