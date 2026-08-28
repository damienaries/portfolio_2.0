/**
 * Static stand-in for the 3D scene.
 *
 * Swap the placeholder block for:
 *   <Image src="/landing-poster.webp" alt="" fill priority className="object-contain" />
 * once the Blender render exists. This also becomes the loading state for the GLB
 * and the fallback for reduced-motion and no-WebGL, so it is never throwaway.
 */

export default function ScenePoster() {
	return (
		<div className="glass absolute inset-0 grid place-items-center overflow-hidden">
			{/* Placeholder ground — a hint of horizon so the composition reads while empty. */}
			<div
				className="absolute inset-x-0 bottom-0 h-1/3 opacity-70"
				style={{
					background:
						'linear-gradient(to top, var(--glow-jade) 0%, transparent 100%)',
				}}
			/>
			<div
				className="absolute rounded-full opacity-80"
				style={{
					width: '38%',
					aspectRatio: '1',
					top: '18%',
					background:
						'radial-gradient(circle at 35% 30%, var(--glow-citrus), transparent 70%)',
				}}
			/>
			<p className="relative font-mono text-label tracking-[0.14em] uppercase text-muted text-center leading-relaxed">
				3D scene
				<br />
				<span className="opacity-60">poster goes here</span>
			</p>
		</div>
	);
}
