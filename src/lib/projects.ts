import projectsData from '../../data/portfolio_data_copy.json';
import { blurFor } from './blur-data';

/** Project data for /work: GitHub enrichment, then grouping into sections. */

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
	isPublic: boolean;
}

/** Visibility must be checked, not inferred: some personal repos are private,
 *  and a "Source" link to one 404s. No token means private repos 404 here too,
 *  which is the correct answer. */
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

	// Only ongoing projects take their date from the last push; a maintenance
	// commit shouldn't make 2022 client work look current.
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

/** First sentence — the one-liner shown in a row. */
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
				// Attached here so both /work and /work/[slug] get it for free.
				mainImage: project.mainImage
					? { ...project.mainImage, blurDataURL: blurFor(project.mainImage.src) }
					: undefined,
				dateMeta,
				displayDate: displayDate(dateMeta),
				summary: firstSentence(project.body ?? ''),
			};
			// Only link source a logged-out visitor can read.
			if (!repo.isPublic) {
				delete next.githubLink;
			}
			return next;
		})
	);

	return all;
}

/** Sections in render order. Grouping replaces per-row category badges. */
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
