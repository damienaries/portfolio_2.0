import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { displayDate, getPost, postSlugs } from '@/content/lab';
import Blocks from '@/components/content/Blocks';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { slug } = await params;
	const post = getPost(slug);
	if (!post) return {};

	return {
		title: post.title,
		description: post.standfirst,
		openGraph: {
			type: 'article',
			title: `${post.title} — Damien Aries`,
			description: post.standfirst,
			publishedTime: post.publishedAt,
		},
	};
}

export default async function LabPost({ params }: Params) {
	const { slug } = await params;
	const post = getPost(slug);
	if (!post) notFound();

	return (
		<article className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-14 pt-10">
			<nav className="pb-8">
				<Link
					href="/lab"
					className="shimmer-text font-mono text-label tracking-widest uppercase text-muted
					           hover:text-ink transition-colors duration-(--dur-fast)">
					&larr; Lab
				</Link>
			</nav>

			<header className="flex flex-col gap-5 pb-12">
				<div className="flex items-baseline gap-4">
					<h1 className="font-display text-2xl font-extrabold tracking-tight text-balance">
						{post.title}
					</h1>
					<time
						dateTime={post.publishedAt}
						className="ml-auto shrink-0 font-mono text-label text-muted tabular-nums">
						{displayDate(post.publishedAt)}
					</time>
				</div>

				<p className="text-lg text-muted">{post.standfirst}</p>

				{post.tags?.length ? (
					<ul className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-label tracking-widest uppercase text-muted">
						{post.tags.map((tag) => (
							<li key={tag}>{tag}</li>
						))}
					</ul>
				) : null}
			</header>

			<Blocks blocks={post.blocks} />

			<div className="mt-16 border-t border-line pt-8">
				<Link
					href="/lab"
					className="shimmer-text font-mono text-label tracking-widest uppercase text-jade
					           hover:underline">
					&larr; Lab
				</Link>
			</div>
		</article>
	);
}
