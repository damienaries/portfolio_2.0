import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Selected Work',
	description:
		'Projects, the decisions behind them, and what I would change. Deep dives on Swizzle and iVisa.',
};

/* Phase 2 builds this out: editorial list, MDX deep dives, and the GitHub
   last-pushed enrichment ported over from src/services/projects.js. */
export default function Work() {
	return (
		<main className="bloom relative isolate min-h-[100svh] px-6 sm:px-10 lg:px-16 py-10">
			<nav className="flex items-center gap-6 font-mono text-label tracking-[0.12em] uppercase">
				<Link href="/" className="text-ink">
					DA
				</Link>
				<span className="text-jade">Work</span>
				<Link href="/legacy" className="text-muted hover:text-ink transition-colors">
					Current site
				</Link>
			</nav>

			<div className="mt-16 max-w-2xl flex flex-col gap-4">
				<h1 className="font-display font-extrabold text-2xl tracking-[-0.02em] text-balance">
					Selected Work
				</h1>
				<p className="text-muted">
					Placeholder route so Enter has somewhere to land. Phase 2 fills this in.
				</p>
				<Link
					href="/projects"
					className="self-start font-mono text-label tracking-[0.1em] uppercase text-jade hover:underline"
				>
					The existing projects page is still live →
				</Link>
			</div>
		</main>
	);
}
