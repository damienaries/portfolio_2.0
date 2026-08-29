import Image from 'next/image';

/**
 * Row thumbnail.
 *
 * Built as its own component so a screen-recording can replace the still later
 * without touching the list: add an optional `video` prop, render a muted,
 * looping <video> with this image as its poster, and play on hover/in-view.
 * The layout box stays identical either way.
 */

export default function ProjectThumb({
	src,
	alt,
	priority,
}: {
	src: string;
	alt: string;
	priority?: boolean;
}) {
	return (
		<div
			className="glass relative shrink-0 overflow-hidden
			           w-24 sm:w-36 lg:w-44 aspect-[16/10]"
		>
			<Image
				src={src}
				alt={alt}
				fill
				sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 176px"
				priority={priority}
				className="object-cover transition-transform duration-(--dur) ease-(--ease)
				           group-hover:scale-[1.04]"
			/>
		</div>
	);
}
