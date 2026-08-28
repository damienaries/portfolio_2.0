import Link from 'next/link';
import Scene from '@/components/landing/Scene';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Landing() {
	return (
		<main className="bloom relative isolate min-h-[100svh] flex flex-col px-6 sm:px-10 lg:px-16 py-6 lg:py-10">
			<nav className="flex items-center gap-4 shrink-0">
				<span className="font-mono text-label tracking-[0.12em] uppercase text-ink">
					DA
				</span>
				<div className="ml-auto">
					<ThemeToggle />
				</div>
			</nav>

			<div className="flex-1 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] gap-10 lg:gap-16 items-center py-10">
				<div className="flex flex-col gap-5 max-w-xl">
					<p className="font-mono text-label tracking-[0.13em] uppercase text-jade">
						Builder · Engineer · Bartender
					</p>

					<h1 className="font-display font-extrabold text-3xl leading-[0.95] tracking-[-0.03em] text-balance">
						Damien Aries
					</h1>

					<p className="text-lg text-muted max-w-[34ch]">
						Engineer in Los Angeles building products that feel{' '}
						<em className="not-italic text-ink underline-citrus">considered</em>.
					</p>

					<Link
						href="/work"
						className="mt-2 self-start font-mono text-label tracking-[0.12em] uppercase
						           bg-jade text-on-jade px-6 py-3 rounded-full
						           transition-transform duration-[var(--dur-fast)]
						           hover:-translate-y-px active:translate-y-0"
						style={{ boxShadow: 'var(--edge)' }}
					>
						Enter
					</Link>
				</div>

				<Scene />
			</div>

			<footer className="shrink-0 flex flex-wrap gap-x-6 gap-y-2 font-mono text-label tracking-[0.1em] uppercase text-muted">
				<a href="mailto:damien@damienaries.com" className="hover:text-ink transition-colors">
					Email
				</a>
				<a
					href="https://github.com/damienaries"
					className="hover:text-ink transition-colors"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
				<a
					href="https://linkedin.com/in/damienaries"
					className="hover:text-ink transition-colors"
					target="_blank"
					rel="noreferrer"
				>
					LinkedIn
				</a>
				<Link href="/resume" className="ml-auto hover:text-ink transition-colors">
					Résumé
				</Link>
			</footer>
		</main>
	);
}
