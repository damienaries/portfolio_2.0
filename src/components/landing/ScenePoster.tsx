import Image from 'next/image';

/**
 * Full-bleed stand-in for the 3D scene. Also the GLB's loading state and the
 * reduced-motion / no-WebGL fallback, so replacing this file is the whole swap.
 *
 * Two nested wrappers so the transforms compose: .parallax-bg follows the
 * pointer, .ambient-drift floats independently. Scrims stay outside both — a
 * moving scrim would drag the gradient off the type it protects.
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
						/* 20px preview so the LCP element fades in rather than popping. */
						blurDataURL="data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADQAwCdASoUAA0APt1cp0yopSOiMAgBEBuJQBOmUABWtZY203XZQIAA/rWrUVYhR2MOir7B0KmNzWDd5zkfFR7OMtYt4ikKPeTYVfFHcuMIQdvoSPRgVAAA"
						className="object-cover object-[30%_center] dark:brightness-[0.62] dark:saturate-[0.85]"
					/>
				</div>
			</div>

			{/* Legibility scrims; the art is a bright sunset in both themes. */}
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
