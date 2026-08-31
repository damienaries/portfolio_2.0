import projectsData from '../../data/portfolio_data_copy.json';
import { blurFor } from './blur-data';

/**
 * Project data for /work. Pure — no network, no secrets, so a build renders the
 * same page every time.
 *
 * Dates and source links used to come from the GitHub API at build time, which
 * needed a token to see private repos. `githubLink` is now only present on repos
 * that are actually public, and dates come from the JSON.
 */

export type Category = 'work' | 'freelance' | 'personal' | 'tool';

export interface Project {
	slug: string;
	title: string;
	category: Category;
	body: string;
	technologies?: string[];
	liveLink?: string;
	/** Only set on public repos — a link to a private one 404s. */
	githubLink?: string;
	mainImage?: { src: string; alt: string; blurDataURL?: string };
	publishedAt?: string;
	startedAt?: string;
	endedAt?: string | null;
	/** Ownership line for featured rows, e.g. 'Founding team · Full-stack'. */
	role?: string;
	featured?: boolean;
	/** First sentence of body — the one-liner shown in a row. */
	summary: string;
	/** Display year(s), e.g. "2026" or "2021—". */
	displayDate: string;
}

export interface Section {
	id: string;
	title: string;
	projects: Project[];
}

const year = (iso?: string | null) => (iso ? iso.slice(0, 4) : '');

/** Employment shows a range; everything else shows the year it shipped. */
function displayDate(p: any): string {
	if (p.category !== 'work') return year(p.publishedAt);
	const start = year(p.startedAt);
	if (!p.endedAt) return `${start}—`;
	const end = year(p.endedAt);
	return start === end ? start : `${start}—${end}`;
}

function firstSentence(body: string): string {
	const clean = body.replace(/\s+/g, ' ').trim();
	const end = clean.search(/[.!?](\s|$)/);
	return end === -1 ? clean : clean.slice(0, end + 1);
}

/** A current role sorts above everything; otherwise most recent first. */
function sortKey(p: Project): number {
	if (p.category === 'work') {
		return p.endedAt ? +new Date(p.endedAt) : Number.MAX_SAFE_INTEGER;
	}
	return p.publishedAt ? +new Date(p.publishedAt) : 0;
}

const PROJECTS: Project[] = (projectsData as any[]).map((p) => ({
	...p,
	mainImage: p.mainImage
		? { ...p.mainImage, blurDataURL: blurFor(p.mainImage.src) }
		: undefined,
	summary: firstSentence(p.body ?? ''),
	displayDate: displayDate(p),
}));

/** Sections in render order. Grouping replaces per-row category badges. */
export function getWorkSections(): Section[] {
	const by = (fn: (p: Project) => boolean) =>
		PROJECTS.filter(fn).sort((a, b) => sortKey(b) - sortKey(a));

	return [
		{ id: 'selected', title: 'Selected Work', projects: by((p) => !!p.featured) },
		{
			id: 'client',
			title: 'Client & Freelance',
			projects: by((p) => !p.featured && p.category === 'freelance'),
		},
		{
			id: 'tools',
			title: 'Tools',
			projects: by((p) => !p.featured && p.category === 'tool'),
		},
	].filter((s) => s.projects.length > 0);
}

export function getProjectBySlug(slug: string): Project | undefined {
	return PROJECTS.find((p) => p.slug === slug);
}
