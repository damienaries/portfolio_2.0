import Image from 'next/image';

/**
 * Static stand-in for the 3D scene, rendered full-bleed behind the landing UI.
 *
 * The baked-in name and Enter control were painted out of the concept render so
 * the page's own HTML owns that type — it needs to stay selectable, translatable
 * and focusable.
 *
 * This is also the loading state for the GLB and the fallback for reduced-motion
 * and no-WebGL, so it is never throwaway. When the Blender render lands, replace
 * the file at this path and nothing else changes.
 */

export default function ScenePoster() {
	return (
		<>
			<Image
				src="/images/landing-poster.webp"
				alt=""
				fill
				priority
				sizes="100vw"
				className="object-cover object-[30%_center] dark:brightness-[0.62] dark:saturate-[0.85]"
			/>

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
