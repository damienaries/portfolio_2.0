import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'About',
	description:
		'From France to Los Angeles the long way, via fifteen years in hospitality. Front-end engineer working where engineering, product and design overlap.',
};

/** Deliberately short and personal — the work pages do the selling. */

const PARAGRAPHS = [
	'I&rsquo;m originally from France, but I&rsquo;ve taken the long way to Los Angeles, with stops in Paris, Montreal, New York and the Caribbean along the way.',
	'Before software, I spent about fifteen years behind bars and running them. Hospitality took me around the world, taught me how to work with all kinds of people, and eventually gave me a pretty good idea of what makes a product&mdash;or an experience&mdash;actually useful.',
	'I moved into software in 2020 and have been building for the web ever since. These days I&rsquo;m most interested in the space where engineering, product and design overlap, especially when there&rsquo;s something visual or creative involved.',
	'I still make a good drink, too.',
];

export default function About() {
	return (
		<div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-14 pt-10">
			<h1 className="pb-10 font-display text-2xl font-extrabold tracking-tight text-balance">
				About
			</h1>

			<div className="flex flex-col gap-5">
				{PARAGRAPHS.map((html, i) => (
					<p
						key={i}
						className={`max-w-[62ch] leading-relaxed ${
							i === 0 ? 'text-lg text-ink' : 'text-muted'
						} ${i === PARAGRAPHS.length - 1 ? 'text-ink' : ''}`}
						dangerouslySetInnerHTML={{ __html: html }}
					/>
				))}
			</div>

			<nav
				className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-8
				           font-mono text-label tracking-widest uppercase"
			>
				<Link href="/work" className="shimmer-text text-jade hover:underline">
					Selected work &rarr;
				</Link>
				<Link
					href="/resume"
					className="shimmer-text text-muted hover:text-ink transition-colors duration-(--dur-fast)"
				>
					Résumé
				</Link>
				<Link
					href="/contact"
					className="shimmer-text text-muted hover:text-ink transition-colors duration-(--dur-fast)"
				>
					Work with me
				</Link>
			</nav>
		</div>
	);
}
