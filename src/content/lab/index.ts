import type { Post } from './types';
import { firstStepsInto3d } from './first-steps-into-3d';

/**
 * Registry of lab posts, newest first.
 *
 * Same rule as the deep dives: a post exists only once its slug appears here, so
 * a draft can sit in the directory without leaking onto /lab or into the
 * static params. Order is derived from publishedAt rather than this array, so
 * adding an entry in the wrong place is harmless.
 */
const POSTS: Post[] = [firstStepsInto3d];

const byNewest = (a: Post, b: Post) =>
	+new Date(b.publishedAt) - +new Date(a.publishedAt);

export const posts: Post[] = [...POSTS].sort(byNewest);

export const postSlugs = posts.map((p) => p.slug);

export function getPost(slug: string): Post | undefined {
	return posts.find((p) => p.slug === slug);
}

/**
 * The still for a post's /lab row: whichever media comes first in the body —
 * a video's poster or an image. Derived rather than declared, so a post can't point at art it doesn't
 * contain — and a post with neither simply gets no thumbnail.
 */
export function thumbFor(post: Post): string | undefined {
	for (const block of post.blocks) {
		if (block.kind === 'video') return block.poster;
		if (block.kind === 'image') return block.src;
	}
}

/**
 * "September 2026". Fixed to UTC — the date is a plain ISO day, and letting it
 * land in the runner's timezone would slide first-of-the-month posts backwards.
 */
export function displayDate(iso: string): string {
	return new Date(iso).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	});
}

export type { Post, Block, Aspect } from './types';
