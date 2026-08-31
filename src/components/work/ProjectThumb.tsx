import Image from 'next/image';

/**
 * Row thumbnail. Its own component so a screen recording can replace the still
 * later — add a `video` prop and render a muted loop with this as its poster.
 */

export default function ProjectThumb({
	src,
	alt,
	priority,
	blurDataURL,
}: {
	src: string;
	alt: string;
	priority?: boolean;
	blurDataURL?: string;
}) {
	return (
		<div
			className="glass relative shrink-0 overflow-hidden
			           w-24 sm:w-36 lg:w-44 aspect-16/10"
		>
			<Image
				src={src}
				alt={alt}
				fill
				sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 176px"
				priority={priority}
				{...(blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {})}
				className="object-cover transition-transform duration-(--dur) ease-(--ease)
				           group-hover:scale-105"
			/>
		</div>
	);
}
