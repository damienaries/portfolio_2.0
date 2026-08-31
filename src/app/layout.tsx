import type { Metadata, Viewport } from 'next';
import {
	Bricolage_Grotesque,
	IBM_Plex_Mono,
	IBM_Plex_Sans,
} from 'next/font/google';
import './globals.css';
import './print-styles.css';
import './landing-styles.css';
import './shimmer-styles.css';
import './resume-styles.css';
// TODO organize CSS in 1 main file to import here

const bricolage = Bricolage_Grotesque({
	subsets: ['latin'],
	weight: ['400', '600', '800'],
	variable: '--font-bricolage',
	display: 'swap',
});

const plexSans = IBM_Plex_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	variable: '--font-plex-sans',
	display: 'swap',
});

const plexMono = IBM_Plex_Mono({
	subsets: ['latin'],
	weight: ['400', '500'],
	variable: '--font-plex-mono',
	display: 'swap',
});

const SITE = 'https://damienaries.com';

export const metadata: Metadata = {
	metadataBase: new URL(SITE),
	title: {
		default: 'Damien Aries — Builder, Engineer, Bartender',
		template: '%s — Damien Aries',
	},
	description:
		'Engineer in Los Angeles building products that bridge bar industry knowledge with technical expertise and love of media and entertainment. Selected work, writing, and a decade of hospitality behind it.',
	openGraph: {
		type: 'website',
		siteName: 'Damien Aries',
		url: SITE,
		title: 'Damien Aries — Builder, Engineer, Bartender',
	},
	twitter: { card: 'summary_large_image' },
	icons: { icon: '/icons/logo.svg' },
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#FCFDFB' },
		{ media: '(prefers-color-scheme: dark)', color: '#080D0A' },
	],
};

/* Runs before first paint so the stored theme is applied without a flash.
   The old pages/_app.js resolved this in an effect, which is why the current
   site flashes dark on load for light-mode visitors. */
const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var dark = saved ? saved === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable}`}
			suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body>{children}</body>
		</html>
	);
}
