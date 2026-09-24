/**
 * Lab posts — the 3D journal.
 *
 * A deep dive is prose with one picture at the top, so DeepDiveSection gets away
 * with `body: string[]`. A post is prose *interleaved* with media, and the media
 * is the point, so the body is a block list instead.
 *
 * Prose lives in TS for the same reason it does in deep-dives/types.ts: JSON
 * strings are painful to edit. The union buys the other half — a render or a
 * still is a typed record carrying its own poster, caption and alt text, so a
 * missing poster is a build error rather than a layout shift in production.
 *
 * Deliberately not built yet: `aside` for tangents, and `embed` for anything too
 * long or too heavy to self-host — a poster plus a click-to-play facade, so no
 * third-party JS loads until someone actually asks for the video.
 */

/**
 * Frame ratios as a closed set. Tailwind scans source for literal class names,
 * so the classes these map to are written out by hand in Blocks.tsx rather than
 * built from the value.
 */
export type Aspect = '16/9' | '3/2' | '4/3' | '1/1';

export type Block =
	| { kind: 'heading'; text: string }
	/** One string per paragraph. `**bold**` is supported. */
	| { kind: 'text'; body: string[] }
	| {
			kind: 'image';
			/** Self-hosted, under /media/lab/<slug>/. */
			src: string;
			alt: string;
			caption?: string;
			aspect?: Aspect;
	  }
	| {
			kind: 'video';
			/** Self-hosted MP4, under /media/lab/<slug>/. */
			src: string;
			/** Required — without one the frame is black until the first decode. */
			poster: string;
			/** Required: it is the accessible name as well as the visible caption. */
			caption: string;
			aspect?: Aspect;
			/** Short render loops autoplay muted. Longer clips wait to be played. */
			loop?: boolean;
	  }
	/**
	 * A hole where an asset will go. Renders as a labelled frame rather than
	 * nothing, so an unfinished post reads as unfinished instead of broken.
	 */
	| { kind: 'placeholder'; label: string; aspect?: Aspect };

export interface Post {
	slug: string;
	title: string;
	/** ISO date. Drives both the sort order and the displayed month. */
	publishedAt: string;
	/** Standfirst under the title — one sentence, and it carries the page description. */
	standfirst: string;
	/** Quiet metadata in the header. Not a filter UI, and not a tag cloud. */
	tags?: string[];
	blocks: Block[];
}
