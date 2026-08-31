import type { Metadata } from 'next';
import Link from 'next/link';
import { getWorkSections, type Project } from '@/lib/projects';
import { deepDiveBySlug } from '@/content/deep-dives';
import ProjectThumb from '@/components/work/ProjectThumb';
import TechIcons from '@/components/work/TechIcons';

export const metadata: Metadata = {
	title: 'Work',
	description:
		'Selected work, client projects and tools — what I owned, what I decided, and how it turned out.',
};

/**
 * Editorial list, not a card grid.
 *
 * A grid weights everything equally and hides the writing behind thumbnails.
 * Rows put the title, the year and one honest sentence in a single scan line,
 * and the section a row sits in says what kind of work it is — no badges.
 */

function ProjectRow({
	project,
	featured,
	priority,
}: {
	project: Project;
	featured?: boolean;
	priority?: boolean;
}) {
	const hasDeepDive = deepDiveBySlug.has(project.slug);

	return (
		<li className="group border-t border-line first:border-t-0">
			<div className="flex gap-5 sm:gap-7 py-6 sm:py-7">
				{project.mainImage && (
					<ProjectThumb
						src={project.mainImage.src}
						alt={project.mainImage.alt}
						priority={priority}
					/>
				)}

				<div className="flex min-w-0 flex-1 flex-col gap-2">
					<div className="flex items-baseline gap-4">
						<h3
							className={`font-display tracking-[-0.02em] text-ink ${
								featured ? 'text-xl font-bold' : 'text-lg font-semibold'
							}`}
						>
							{project.title}
						</h3>
						<span className="ml-auto shrink-0 font-mono text-label text-muted tabular-nums">
							{project.displayDate}
						</span>
					</div>

					{project.role && (
						<p className="font-mono text-label tracking-[0.1em] uppercase text-jade">
							{project.role}
						</p>
					)}

					<p className="max-w-[62ch] text-sm text-muted">{project.summary}</p>

					{hasDeepDive && (
						<Link
							href={`/work/${project.slug}`}
							className="shimmer-text self-start font-mono text-label tracking-[0.1em] uppercase text-jade
							           hover:underline"
						>
							Read the deep dive &rarr;
						</Link>
					)}

					<div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
						<TechIcons technologies={project.technologies} />

						{/* Both, when both exist — the live site and the code answer
						    different questions, and an engineer reading this wants the
						    second one. githubLink is only present on public repos. */}
						<div className="ml-auto flex shrink-0 items-center gap-4">
							{project.githubLink && (
								<a
									href={project.githubLink}
									target="_blank"
									rel="noreferrer"
									className="shimmer-text font-mono text-label tracking-[0.1em] uppercase text-muted
									           hover:text-ink transition-colors duration-(--dur-fast)"
								>
									Source
								</a>
							)}
							{project.liveLink && (
								<a
									href={project.liveLink}
									target="_blank"
									rel="noreferrer"
									className="shimmer-text font-mono text-label tracking-[0.1em] uppercase text-jade
									           transition-transform duration-(--dur-fast) ease-(--ease)
									           group-hover:translate-x-0.5"
								>
									Visit &rarr;
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</li>
	);
}

export default async function Work() {
	const sections = await getWorkSections();

	return (
		<div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-14 pt-10 pb-4">
			<header className="flex max-w-2xl flex-col gap-4 pb-12">
				<h1 className="font-display text-2xl font-extrabold tracking-[-0.025em] text-balance">
					Work
				</h1>
				<p className="text-lg text-muted">
					Ten years of hospitality, then six building software. These are the
					projects where I owned something worth describing.
				</p>
			</header>

			<div className="flex flex-col gap-16">
				{sections.map((section) => (
					<section key={section.id} aria-labelledby={section.id}>
						<h2
							id={section.id}
							className="pb-4 font-display text-xl font-bold tracking-[-0.02em] text-ink"
						>
							{section.title}
						</h2>

						<ul className="flex flex-col">
							{section.projects.map((project, i) => (
								<ProjectRow
									key={project.title}
									project={project}
									featured={section.id === 'selected'}
									priority={section.id === 'selected' && i < 2}
								/>
							))}
						</ul>
					</section>
				))}
			</div>
		</div>
	);
}
