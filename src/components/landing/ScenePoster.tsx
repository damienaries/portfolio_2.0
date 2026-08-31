import Image from 'next/image';

/**
 * Static stand-in for the 3D scene, rendered full-bleed behind the landing UI.
 *
 * The baked-in name and Enter control were painted out of the concept render so
 * the page's own HTML owns that type — it needs to stay selectable, translatable
 * and focusable.
 *
 * Two nested wrappers give the image its motion: .parallax-bg follows the
 * pointer (driven by ParallaxRoot), .ambient-drift adds a slow independent float
 * so the scene is alive on touch devices and when the cursor is still. Splitting
 * them means the two transforms compose instead of overwriting each other.
 *
 * The scrims sit outside both wrappers on purpose — a moving scrim would drag
 * the legibility gradient away from the type it exists to protect.
 *
 * This is also the loading state for the GLB and the fallback for reduced-motion
 * and no-WebGL, so it is never throwaway. When the Blender render lands, replace
 * the file at this path and nothing else changes.
 */

export default function ScenePoster() {
	return (
		<>
			<div className="parallax-bg">
				<div className="ambient-drift">
					<Image
						src="/images/landing-poster.webp"
						alt=""
						fill
						priority
						sizes="100vw"
						placeholder="blur"
						/* 20px inline preview so the LCP element fades in rather than
						   popping. Generated from the poster itself, not a flat colour. */
						blurDataURL="data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADQAwCdASoUAA0APt1cp0yopSOiMAgBEBuJQBOmUABWtZY203XZQIAA/rWrUVYhR2MOir7B0KmNzWDd5zkfFR7OMtYt4ikKPeTYVfFHcuMIQdvoSPRgVAAA"
						className="object-cover object-[30%_center] dark:brightness-[0.62] dark:saturate-[0.85]"
					/>
				</div>
			</div>

			{/* Legibility scrim. Light: a wash from the right so ink reads over sky.
			    Dark: a heavier veil, since the art stays a bright sunset either way. */}
			<div
				aria-hidden="true"
				className="scrim-side absolute inset-0 pointer-events-none"
			/>
			<div
				aria-hidden="true"
				className="scrim-bottom absolute inset-x-0 bottom-0 h-40 pointer-events-none"
			/>
		</>
	);
}
