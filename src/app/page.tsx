import Button from '@/components/ui/Button';
import ParallaxRoot from '@/components/landing/ParallaxRoot';
import Scene from '@/components/landing/Scene';

/**
 * Full-viewport landing. The scene fills the frame; all type is HTML on top.
 *
 * Deliberately has no nav and no footer — the only way forward is Enter. Every
 * other route carries the shell, so wayfinding starts once you're inside.
 *
 * Uses 100svh rather than 100vh so mobile browser chrome can't push the Enter
 * control below the fold on first paint.
 */
export default function Landing() {
	return (
		<ParallaxRoot className="relative isolate h-svh w-full overflow-hidden">
			<Scene />

			{/* Character occupies the left of the frame, so the type block sits right. */}
			{/* Mobile parks the type low so the character keeps the upper frame.
			    20svh, not 20% — percentage padding resolves against width, not height.
			    Temporary: this moves once the landing animation is final. */}
			<div className="relative h-full flex justify-center px-6 sm:px-10
			                items-end pb-[20svh]
			                lg:items-center lg:justify-end lg:pb-0 lg:px-16">
				<div className="parallax-fg flex flex-col gap-6 w-full max-w-md lg:max-w-lg lg:items-end lg:text-right">
					<div className="flex flex-col gap-3 lg:items-end">
						{/* One heading, two tiers. The greeting is set quieter so the
						    name still carries the page — and so the surname stays in
						    the h1, which is the only place it appears on screen. */}
						<h1 className="font-display text-3xl leading-[0.92] tracking-display text-balance">
							<span className="block font-normal text-xl tracking-tight text-muted">
								Hi, I&rsquo;m
							</span>
							<span className="font-extrabold">Damien Aries</span>
						</h1>

						<p className="font-mono text-label tracking-caps uppercase text-jade">
							Front-end engineer in LA
						</p>
					</div>

					<Button href="/work" size="lg" className="mt-2">
						Enter
					</Button>
				</div>
			</div>
		</ParallaxRoot>
	);
}
