import projectsData from '../../data/portfolio_data_copy.json';

const GITHUB_API = 'https://api.github.com';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const CATEGORY_ORDER = ['work', 'freelance', 'personal'];

function parseGitHubRepo(url) {
	if (!url) return null;
	const match = url.match(/github\.com\/([^/]+)\/([^/.]+)/);
	return match ? { owner: match[1], repo: match[2] } : null;
}

async function fetchLastPushed(githubLink, token) {
	const parsed = parseGitHubRepo(githubLink);
	if (!parsed || !token) return null;
	try {
		const res = await fetch(
			`${GITHUB_API}/repos/${parsed.owner}/${parsed.repo}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/vnd.github+json',
				},
			}
		);
		if (!res.ok) return null;
		const data = await res.json();
		return data.pushed_at || null;
	} catch {
		return null;
	}
}

function buildDateMeta(project, lastPushed) {
	if (project.category === 'work') {
		return {
			kind: 'range',
			startedAt: project.startedAt || null,
			endedAt: project.endedAt ?? null,
		};
	}
	const published = project.publishedAt;
	if (
		lastPushed &&
		new Date(lastPushed) - new Date(published) > SEVEN_DAYS_MS
	) {
		return { kind: 'updated', date: lastPushed };
	}
	return { kind: 'created', date: published };
}

function sortKey(project) {
	if (project.category === 'work') {
		if (!project.endedAt) return Number.MAX_SAFE_INTEGER;
		return new Date(project.endedAt).getTime();
	}
	return new Date(project.dateMeta.date).getTime();
}

export async function getSortedProjects() {
	const token = process.env.GITHUB_TOKEN;

	const enriched = await Promise.all(
		projectsData.map(async (project) => {
			const lastPushed = await fetchLastPushed(project.githubLink, token);
			return { ...project, dateMeta: buildDateMeta(project, lastPushed) };
		})
	);

	return CATEGORY_ORDER.flatMap((cat) =>
		enriched
			.filter((p) => p.category === cat)
			.sort((a, b) => sortKey(b) - sortKey(a))
	);
}
