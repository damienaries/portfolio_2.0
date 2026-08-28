import Link from 'next/link';
import Scene from '@/components/landing/Scene';
import ThemeToggle from '@/components/ui/ThemeToggle';

/**
 * Full-viewport landing. The scene fills the frame; all type is HTML on top.
 *
 * Uses 100svh rather than 100vh so mobile browser chrome can't push the Enter
 * control below the fold on first paint.
 */
export default function Landing() {
	return (
		<main className="relative isolate h-[100svh] w-full overflow-hidden">
			<Scene />

			<div className="relative h-full flex flex-col px-6 sm:px-10 lg:px-14 py-6 lg:py-8">
				<header className="flex items-center shrink-0">
					<span className="glass glass-pill px-3.5 py-1.5 font-mono text-label tracking-[0.14em] uppercase text-ink">
						Damien Aries
					</span>
					<div className="ml-auto">
						<ThemeToggle />
					</div>
				</header>

				{/* Character occupies the left of the frame, so the type block sits right. */}
				<div className="flex-1 flex items-center justify-center lg:justify-end min-h-0">
					<div className="flex flex-col gap-5 w-full max-w-md lg:max-w-lg lg:items-end lg:text-right">
						<p className="font-mono text-label tracking-[0.16em] uppercase text-jade">
							Builder · Engineer · Bartender
						</p>

						<h1 className="font-display font-extrabold text-3xl leading-[0.92] tracking-[-0.035em] text-balance">
							Damien Aries
						</h1>

						<p className="text-lg text-muted max-w-[32ch]">
							Engineer in Los Angeles building products that feel{' '}
							<em className="not-italic text-ink underline-citrus">considered</em>.
						</p>

						<Link
							href="/work"
							className="mt-1 font-mono text-label tracking-[0.14em] uppercase
							           bg-jade text-on-jade px-7 py-3.5 rounded-full
							           transition-transform duration-[var(--dur-fast)] ease-[var(--ease)]
							           hover:-translate-y-px active:translate-y-0"
							style={{ boxShadow: 'var(--edge), var(--lift)' }}
						>
							Enter
						</Link>
					</div>
				</div>

				<footer className="shrink-0 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-label tracking-[0.12em] uppercase text-muted">
					<a
						href="mailto:damien@damienaries.com"
						className="hover:text-ink transition-colors duration-[var(--dur-fast)]"
					>
						Email
					</a>
					<a
						href="https://github.com/damienaries"
						target="_blank"
						rel="noreferrer"
						className="hover:text-ink transition-colors duration-[var(--dur-fast)]"
					>
						GitHub
					</a>
					<a
						href="https://linkedin.com/in/damienaries"
						target="_blank"
						rel="noreferrer"
						className="hover:text-ink transition-colors duration-[var(--dur-fast)]"
					>
						LinkedIn
					</a>
					<Link
						href="/resume"
						className="ml-auto hover:text-ink transition-colors duration-[var(--dur-fast)]"
					>
						Résumé
					</Link>
				</footer>
			</div>
		</main>
	);
}
