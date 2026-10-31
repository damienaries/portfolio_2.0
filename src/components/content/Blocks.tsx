import Image from 'next/image';
import LoopVideo from '@/components/content/LoopVideo';
import Prose from '@/components/content/Prose';
import { blurFor } from '@/lib/blur-data';
import type { Aspect, Block } from '@/content/lab/types';

/**
 * Renders a lab post body.
 *
 * Server-rendered by design, with one exception: a looping video hands off to
 * LoopVideo, because honouring prefers-reduced-motion needs the browser. A post
 * without a loop still ships no client JS. That is also why there is no YouTube
 * embed here yet — every asset so far is small enough to self-host.
 */

/* Written out rather than interpolated — Tailwind scans for literal strings. */
const ASPECT: Record<Aspect, string> = {
	'16/9': 'aspect-video',
	'3/2': 'aspect-[3/2]',
	'4/3': 'aspect-[4/3]',
	'1/1': 'aspect-square',
};

function Frame({
	aspect = '16/9',
	caption,
	dashed,
	children,
}: {
	aspect?: Aspect;
	caption?: string;
	dashed?: boolean;
	children: React.ReactNode;
}) {
	return (
		<figure className="flex flex-col gap-3">
			<div
				className={`relative overflow-hidden ${ASPECT[aspect]} ${
					dashed
						? 'grid place-items-center rounded-panel border border-dashed border-line'
						: 'glass'
				}`}>
				{children}
			</div>
			{caption && (
				<figcaption className="font-mono text-label tracking-widest uppercase text-muted">
					{caption}
				</figcaption>
			)}
		</figure>
	);
}

export default function Blocks({ blocks }: { blocks: Block[] }) {
	return (
		<div className="flex flex-col gap-10">
			{blocks.map((block, i) => {
				switch (block.kind) {
					case 'heading':
						return (
							<h2
								key={i}
								className="font-display text-xl font-bold tracking-tight text-ink">
								{block.text}
							</h2>
						);

					case 'text':
						return (
							<div key={i} className="flex flex-col gap-4">
								{block.body.map((paragraph, j) => (
									<p key={j} className="max-w-[68ch] text-muted leading-relaxed">
										<Prose text={paragraph} />
									</p>
								))}
							</div>
						);

					case 'image':
						return (
							<Frame key={i} aspect={block.aspect} caption={block.caption}>
								<Image
									src={block.src}
									alt={block.alt}
									fill
									sizes="(max-width: 768px) 100vw, 768px"
									{...(blurFor(block.src)
										? {
												placeholder: 'blur' as const,
												blurDataURL: blurFor(block.src),
											}
										: {})}
									className="object-cover"
								/>
							</Frame>
						);

					case 'video':
						return (
							<Frame key={i} aspect={block.aspect} caption={block.caption}>
								{block.loop ? (
									<LoopVideo
										src={block.src}
										poster={block.poster}
										label={block.caption}
									/>
								) : (
									<video
										src={block.src}
										poster={block.poster}
										aria-label={block.caption}
										controls
										preload="none"
										playsInline
										className="h-full w-full object-cover"
									/>
								)}
							</Frame>
						);

					case 'placeholder':
						return (
							<Frame key={i} aspect={block.aspect} dashed>
								<span className="px-6 text-center font-mono text-label tracking-widest uppercase text-muted">
									{block.label}
									<span className="block pt-1 text-jade">Coming</span>
								</span>
							</Frame>
						);
				}
			})}
		</div>
	);
}
