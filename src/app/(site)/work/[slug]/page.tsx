import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { deepDiveSlugs, getDeepDive } from '@/content/deep-dives';
import { getProjectBySlug } from '@/lib/projects';
import TechIcons from '@/components/work/TechIcons';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return deepDiveSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const { slug } = await params;
	const dive = getDeepDive(slug);
	const project = getProjectBySlug(slug);
	if (!dive || !project) return {};

	return {
		title: project.title,
		description: dive.intro,
		openGraph: {
			title: `${project.title} — Damien Aries`,
			description: dive.intro,
			images: project.mainImage ? [project.mainImage.src] : undefined,
		},
	};
}

/** Renders **bold** spans without pulling in a markdown dependency. */
function Prose({ text }: { text: string }) {
	const parts = text.split(/(\*\*[^*]+\*\*)/g);
	return (
		<>
			{parts.map((part, i) =>
				part.startsWith('**') && part.endsWith('**') ? (
					<strong key={i} className="font-semibold text-ink">
						{part.slice(2, -2)}
					</strong>
				) : (
					part
				)
			)}
		</>
	);
}

export default async function DeepDivePage({ params }: Params) {
	const { slug } = await params;
	const dive = getDeepDive(slug);
	const project = getProjectBySlug(slug);
	if (!dive || !project) notFound();

	return (
		<article className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-14 pt-10">
			<nav className="pb-8">
				<Link
					href="/work"
					className="shimmer-text font-mono text-label tracking-widest uppercase text-muted
					           hover:text-ink transition-colors duration-(--dur-fast)"
				>
					&larr; Work
				</Link>
			</nav>

			<header className="flex flex-col gap-5 pb-10">
				<div className="flex items-baseline gap-4">
					<h1 className="font-display text-2xl font-extrabold tracking-tight text-balance">
						{project.title}
					</h1>
					<span className="ml-auto shrink-0 font-mono text-label text-muted tabular-nums">
						{project.displayDate}
					</span>
				</div>

				{project.role && (
					<p className="font-mono text-label tracking-widest uppercase text-jade">
						{project.role}
					</p>
				)}

				<p className="text-lg text-muted">{dive.intro}</p>

				<div className="flex flex-wrap items-center gap-x-5 gap-y-3">
					<TechIcons technologies={project.technologies} />
					<div className="ml-auto flex items-center gap-4">
						{project.githubLink && (
							<a
								href={project.githubLink}
								target="_blank"
								rel="noreferrer"
								className="shimmer-text font-mono text-label tracking-widest uppercase text-muted
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
								className="shimmer-text font-mono text-label tracking-widest uppercase text-jade
								           hover:underline"
							>
								Visit &rarr;
							</a>
						)}
					</div>
				</div>
			</header>

			{project.mainImage && (
				<div className="glass relative mb-14 aspect-video overflow-hidden">
					<Image
						src={project.mainImage.src}
						alt={project.mainImage.alt}
						fill
						priority
						sizes="(max-width: 768px) 100vw, 768px"
						{...(project.mainImage.blurDataURL
							? { placeholder: 'blur' as const, blurDataURL: project.mainImage.blurDataURL }
							: {})}
						className="object-cover"
					/>
				</div>
			)}

			<div className="flex flex-col gap-12">
				{dive.sections.map((section) => (
					<section key={section.heading} className="flex flex-col gap-4">
						<h2 className="font-display text-xl font-bold tracking-tight text-ink">
							{section.heading}
						</h2>
						{section.body.map((paragraph, i) => (
							<p key={i} className="max-w-[68ch] text-muted leading-relaxed">
								<Prose text={paragraph} />
							</p>
						))}
					</section>
				))}

				{dive.outcomes?.length ? (
					<section className="flex flex-col gap-4">
						<h2 className="font-display text-xl font-bold tracking-tight text-ink">
							Outcome
						</h2>
						<ul className="flex flex-col gap-2">
							{dive.outcomes.map((item, i) => (
								<li
									key={i}
									className="max-w-[68ch] border-l-2 border-line pl-4 text-muted"
								>
									<Prose text={item} />
								</li>
							))}
						</ul>
					</section>
				) : null}

				{dive.wouldChange?.length ? (
					<section className="flex flex-col gap-4">
						<h2 className="font-display text-xl font-bold tracking-tight text-ink">
							What I&rsquo;d change
						</h2>
						<ul className="flex flex-col gap-2">
							{dive.wouldChange.map((item, i) => (
								<li
									key={i}
									className="max-w-[68ch] border-l-2 border-line pl-4 text-muted"
								>
									<Prose text={item} />
								</li>
							))}
						</ul>
					</section>
				) : null}
			</div>

			<div className="mt-16 border-t border-line pt-8">
				<Link
					href="/work"
					className="shimmer-text font-mono text-label tracking-widest uppercase text-jade
					           hover:underline"
				>
					&larr; Work
				</Link>
			</div>
		</article>
	);
}
