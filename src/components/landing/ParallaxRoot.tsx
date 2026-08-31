'use client';

import { useEffect, useRef } from 'react';

/**
 * Publishes pointer position as --px / --py on its own element, smoothed.
 *
 * Deliberately cheap: one rAF loop while the pointer is moving, two custom
 * property writes per frame, and no React state — so nothing re-renders and the
 * transforms stay on the compositor.
 *
 * Bails entirely on reduced-motion and on devices without a real pointer. In
 * both cases the CSS falls back to the ambient drift, and the poster underneath
 * is unaffected — which is what keeps this non-blocking for the 3D scene later.
 */
export default function ParallaxRoot({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
		if (noMotion || !hasPointer) return;

		const target = { x: 0, y: 0 };
		const current = { x: 0, y: 0 };
		let frame = 0;

		const tick = () => {
			// Ease toward the pointer so fast movement doesn't snap.
			current.x += (target.x - current.x) * 0.08;
			current.y += (target.y - current.y) * 0.08;

			el.style.setProperty('--px', current.x.toFixed(4));
			el.style.setProperty('--py', current.y.toFixed(4));

			const settled =
				Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
			frame = settled ? 0 : requestAnimationFrame(tick);
		};

		const onMove = (e: PointerEvent) => {
			target.x = (e.clientX / window.innerWidth - 0.5) * 2;
			target.y = (e.clientY / window.innerHeight - 0.5) * 2;
			if (!frame) frame = requestAnimationFrame(tick);
		};

		// Drift back to centre when the cursor leaves the window.
		const onLeave = () => {
			target.x = 0;
			target.y = 0;
			if (!frame) frame = requestAnimationFrame(tick);
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		document.addEventListener('pointerleave', onLeave);

		return () => {
			window.removeEventListener('pointermove', onMove);
			document.removeEventListener('pointerleave', onLeave);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<div ref={ref} className={`parallax-root ${className}`}>
			{children}
		</div>
	);
}
