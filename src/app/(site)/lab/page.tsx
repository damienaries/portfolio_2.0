import type { Metadata } from 'next';
import Link from 'next/link';
import { displayDate, posts, thumbFor } from '@/content/lab';
import ProjectThumb from '@/components/work/ProjectThumb';
import { blurFor } from '@/lib/blur-data';

export const metadata: Metadata = {
	title: 'Lab',
	description:
		'Notes from learning 3D — Blender, rendering, and the tools I want to build around them.',
};

/**
 * The 3D journal index.
 *
 * Same editorial rows as /work, thumbnail included — the lead render is the
 * fastest way to tell one post from the next. The still is decorative (the
 * title is the link text), so its alt is empty.
 */
export default function Lab() {
	return (
		<div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-14 pt-10 pb-4">
			<header className="flex max-w-2xl flex-col gap-4 pb-12">
				<h1 className="font-display text-2xl font-extrabold tracking-tight text-balance">
					Lab
				</h1>
				<p className="text-lg text-muted">
					Where I try things in the open and write down what happened. Right now
					that is mostly 3D —
					learning Blender, rendering, and the asset pipelines behind the tools I
					want to build next.
				</p>
			</header>

			<ul className="flex flex-col">
				{posts.map((post, i) => {
					const thumb = thumbFor(post);
					return (
						<li key={post.slug} className="group border-t border-line first:border-t-0">
							<Link href={`/lab/${post.slug}`} className="flex gap-5 sm:gap-7 py-7">
								{thumb && (
									<ProjectThumb
										src={thumb}
										alt=""
										priority={i === 0}
										blurDataURL={blurFor(thumb)}
									/>
								)}

								<div className="flex min-w-0 flex-1 flex-col gap-2">
									<div className="flex items-baseline gap-4">
										<h2 className="font-display text-xl font-bold tracking-tight text-ink">
											{post.title}
										</h2>
										<span className="ml-auto shrink-0 font-mono text-label text-muted tabular-nums">
											{displayDate(post.publishedAt)}
										</span>
									</div>

									<p className="max-w-[62ch] text-sm text-muted">{post.standfirst}</p>

									<span
										className="shimmer-text self-start pt-1 font-mono text-label tracking-widest uppercase text-jade
										           transition-transform duration-(--dur-fast) ease-(--ease)
										           group-hover:translate-x-0.5">
										Read &rarr;
									</span>
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
