import projectsData from '../../data/portfolio_data_copy.json';
import { blurFor } from './blur-data';

/**
 * Project data for /work.
 *
 * Ported from src/services/projects.js — the GitHub last-pushed enrichment is
 * unchanged, since it's the thing that keeps dates honest without manual edits.
 * What's new is grouping: sections are derived from `featured` / `category`
 * rather than the old three-tab split.
 */

const GITHUB_API = 'https://api.github.com';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export type Category = 'work' | 'freelance' | 'personal' | 'tool';

export type DateMeta =
	| { kind: 'range'; startedAt: string | null; endedAt: string | null }
	| { kind: 'updated' | 'created'; date: string };

export interface Project {
	slug: string;
	title: string;
	category: Category;
	body: string;
	technologies?: string[];
	liveLink?: string;
	githubLink?: string;
	mainImage?: { src: string; alt: string; blurDataURL?: string };
	publishedAt?: string;
	startedAt?: string;
	endedAt?: string | null;
	/** Ownership line for featured rows, e.g. 'Founding team · Full-stack'. */
	role?: string;
	featured?: boolean;
	dateMeta: DateMeta;
	/** First sentence of body — the one-liner used in compact rows. */
	summary: string;
	/** Display year(s) for the row, e.g. "2026" or "2021—". */
	displayDate: string;
}

export interface Section {
	id: string;
	title: string;
	projects: Project[];
}

function parseGitHubRepo(url?: string) {
	if (!url) return null;
	const match = url.match(/github\.com\/([^/]+)\/([^/.]+)/);
	return match ? { owner: match[1], repo: match[2] } : null;
}

interface RepoMeta {
	pushedAt: string | null;
	/** Confirmed visible to a logged-out visitor. */
	isPublic: boolean;
}

/**
 * One call gives us both the last-pushed date and whether the repo is public.
 *
 * Visibility has to be checked, not assumed from category: essential_cocktails
 * (Swizzle) and corea-creative are both private, so linking "Source" off the
 * old personal/freelance heuristic would have sent visitors to a 404.
 *
 * Without a token the API 404s on private repos — which is exactly the right
 * answer here, since that's what a visitor would see too.
 */
async function fetchRepoMeta(githubLink?: string, token?: string): Promise<RepoMeta> {
	const none: RepoMeta = { pushedAt: null, isPublic: false };
	const parsed = parseGitHubRepo(githubLink);
	if (!parsed) return none;

	try {
		const res = await fetch(`${GITHUB_API}/repos/${parsed.owner}/${parsed.repo}`, {
			headers: {
				Accept: 'application/vnd.github+json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		});
		if (!res.ok) {
			// 404 unauthenticated means private, which is a legitimate answer.
			if (res.status !== 404) {
				console.warn(
					`[projects] GitHub fetch failed for ${parsed.owner}/${parsed.repo}: ${res.status}`
				);
			}
			return none;
		}
		const data = await res.json();
		return { pushedAt: data.pushed_at ?? null, isPublic: data.private === false };
	} catch (err) {
		console.warn(`[projects] GitHub fetch error:`, (err as Error).message);
		return none;
	}
}

function buildDateMeta(project: any, lastPushed: string | null): DateMeta {
	if (project.category === 'work') {
		return {
			kind: 'range',
			startedAt: project.startedAt || null,
			endedAt: project.endedAt ?? null,
		};
	}
	const published = project.publishedAt;

	// "Last pushed" only stands in for the date on things I still build. Client
	// work was delivered once — a maintenance push in 2026 must not make a 2022
	// site look like this year's work, or reorder the section.
	const ongoing = project.category === 'personal' || project.category === 'tool';
	if (ongoing && lastPushed && +new Date(lastPushed) - +new Date(published) > SEVEN_DAYS_MS) {
		return { kind: 'updated', date: lastPushed };
	}
	return { kind: 'created', date: published };
}

function displayDate(meta: DateMeta): string {
	if (meta.kind === 'range') {
		const start = meta.startedAt ? meta.startedAt.slice(0, 4) : '';
		if (!meta.endedAt) return `${start}—`;
		const end = meta.endedAt.slice(0, 4);
		return start === end ? start : `${start}—${end}`;
	}
	return meta.date ? meta.date.slice(0, 4) : '';
}

/** First sentence, for the one-line row description. */
function firstSentence(body: string): string {
	const clean = body.replace(/\s+/g, ' ').trim();
	const end = clean.search(/[.!?](\s|$)/);
	return end === -1 ? clean : clean.slice(0, end + 1);
}

function sortKey(p: Project): number {
	if (p.dateMeta.kind === 'range') {
		return p.dateMeta.endedAt ? +new Date(p.dateMeta.endedAt) : Number.MAX_SAFE_INTEGER;
	}
	return +new Date(p.dateMeta.date);
}

async function enrich(): Promise<Project[]> {
	const token = process.env.GITHUB_TOKEN;

	const all = await Promise.all(
		(projectsData as any[]).map(async (project) => {
			const repo = await fetchRepoMeta(project.githubLink, token);
			const dateMeta = buildDateMeta(project, repo.pushedAt);
			const next: Project = {
				...project,
				// Attached here rather than in each component: the blur belongs to
				// the image, and both /work and /work/[slug] render the same one.
				mainImage: project.mainImage
					? { ...project.mainImage, blurDataURL: blurFor(project.mainImage.src) }
					: undefined,
				dateMeta,
				displayDate: displayDate(dateMeta),
				summary: firstSentence(project.body ?? ''),
			};
			// Link source only where a logged-out visitor can actually read it.
			if (!repo.isPublic) {
				delete next.githubLink;
			}
			return next;
		})
	);

	return all;
}

/**
 * Sections in render order. Distinction is carried by grouping, not by a badge
 * on every row — a reader sees what kind of work it is from where it sits, so
 * the headings stand alone without explanatory subtitles.
 */
export async function getWorkSections(): Promise<Section[]> {
	const projects = await enrich();
	const by = (fn: (p: Project) => boolean) =>
		projects.filter(fn).sort((a, b) => sortKey(b) - sortKey(a));

	return [
		{
			id: 'selected',
			title: 'Selected Work',
			projects: by((p) => !!p.featured),
		},
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

/** Single project by slug, for /work/[slug]. */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
	const projects = await enrich();
	return projects.find((p) => p.slug === slug);
}
