'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A short render loop: muted, inline, and only running while it's on screen.
 *
 * The one client island in a lab post. Native `controls` covered pausing
 * before, but the server can't read prefers-reduced-motion, and a full player
 * chrome is a lot of furniture for an eight-second loop. So: no `autoPlay`
 * attribute — playback starts from here once the frame scrolls into view, and
 * never by itself under reduced motion. `preload="none"` until then, so the
 * MP4 costs nothing for a reader who never reaches it.
 *
 * The toggle stays either way: anything that moves for more than five seconds
 * has to be pausable (WCAG 2.2.2). Once someone pauses, scrolling doesn't
 * restart it.
 */
export default function LoopVideo({
	src,
	poster,
	label,
}: {
	src: string;
	poster: string;
	label: string;
}) {
	const ref = useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = useState(false);
	const pausedByUser = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		// React sets `muted` as a property, not an attribute, so it never reaches
		// the server HTML. iOS Safari refuses unmuted play(); set it before asking.
		el.muted = true;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !pausedByUser.current) {
					// Rejects on Low Power Mode or data saver; the poster stays and
					// the toggle still works.
					el.play().catch(() => {});
				} else if (!entry.isIntersecting) {
					el.pause();
				}
			},
			{ threshold: 0.25 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const toggle = () => {
		const el = ref.current;
		if (!el) return;
		if (el.paused) {
			pausedByUser.current = false;
			el.play().catch(() => {});
		} else {
			pausedByUser.current = true;
			el.pause();
		}
	};

	return (
		<>
			<video
				ref={ref}
				src={src}
				poster={poster}
				aria-label={label}
				muted
				loop
				playsInline
				preload="none"
				disableRemotePlayback
				onPlay={() => setPlaying(true)}
				onPause={() => setPlaying(false)}
				className="h-full w-full object-cover"
			/>
			<button
				type="button"
				onClick={toggle}
				aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
				className="glass absolute bottom-3 right-3 px-3 py-1.5
				           font-mono text-label tracking-widest uppercase text-ink
				           hover:text-jade transition-colors duration-(--dur-fast)">
				{playing ? 'Pause' : 'Play'}
			</button>
		</>
	);
}
