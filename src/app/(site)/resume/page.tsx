import type { Metadata } from 'next';
import resumeData from '../../../../data/resume_data.json';
import PrintButton from '@/components/resume/PrintButton';

export const metadata: Metadata = {
	title: 'Résumé',
	description:
		'Front-end engineer in Los Angeles. Six years building customer-facing interfaces in React, Next.js, Vue and TypeScript.',
};

/**
 * The résumé document, unchanged.
 *
 * Layout, proportions and type scale are ported 1:1 from the Emotion version —
 * 800px sheet, the two accent bars, the dark contact box, 3rem uppercase name,
 * two columns split flex-1 / 200px. Only the palette moved to the v3 tokens.
 *
 * What you see here is what prints and what "Save as PDF" produces: one render,
 * no second artifact to fall out of date.
 *
 * The one deliberate departure is mobile. The old page set `zoom: 0.48` on the
 * whole container, which shrank the document to unreadable rather than changing
 * its layout. Here the sheet keeps its 800px and the wrapper scrolls, so the
 * document is never redrawn — just panned.
 */

const { personalInfo, experience, education, expertise } = resumeData;

/** Matches the old `.resume-content h3` rule. */
function Heading({ children }: { children: React.ReactNode }) {
	return (
		<h3
			className="mb-2 flex items-center gap-1 border-b sheet-ink-border pb-px
			           text-base font-extrabold uppercase tracking-[0.5px]">
			{children}
		</h3>
	);
}

export default function Resume() {
	return (
		<div className="resume-page px-4 sm:px-10 lg:px-14 pt-10">
			<div className="mx-auto mb-6 flex max-w-200 items-center gap-4 print:hidden">
				<h1 className="font-display text-2xl font-extrabold tracking-tight">
					Résumé
				</h1>
				<div className="ml-auto">
					<PrintButton />
				</div>
			</div>

			{/* Sheet keeps its natural width; small screens pan rather than reflow. */}
			<div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 print:overflow-visible">
				<div className="resume-sheet resume-container relative mx-auto w-200 max-w-200 p-8">
					{/* left accent bar; the top bar lives with the contact box below,
					    so it can't drift out of alignment when the box changes width */}
					{/* Direct children of .resume-container, as in the legacy markup —
					    this is what lets them reach the sheet edge in print. */}
					<div aria-hidden="true" className="top-bar" />
					<div aria-hidden="true" className="left-bar" />

					<div className="resume-paper resume-content p-4">
						{/* ---------- header ---------- */}
						<header className="relative mb-6">
							<div className="mb-4 flex items-end justify-between">
								<div className="relative flex flex-1 flex-col pl-2 print:pl-0">
									<h2 className="text-5xl font-extrabold uppercase leading-[1.2] tracking-[0.5px]">
										{personalInfo.name}
									</h2>
									<p className="text-xs font-bold uppercase leading-[1.4] tracking-[0.5px] sheet-muted-text">
										{personalInfo.title}
									</p>
								</div>

								<div className="resume-contact z-10 -mt-[1.1rem] flex min-w-50 flex-col self-start">
									<div
										aria-hidden="true"
										className="top-bar-cap sheet-ink-bg h-[1.1rem]"
									/>
									<address className="sheet-ink-bg px-4 py-4 pr-8 text-[0.85rem] not-italic text-white">
										{[
											{
												k: 'E:',
												v: personalInfo.email,
												href: `mailto:${personalInfo.email}`,
											},
											{
												k: 'W:',
												v: personalInfo.website,
												href: `https://${personalInfo.website}`,
											},
											{ k: 'P:', v: '(917) 921-1162', href: 'tel:9179211162' },
										].map(({ k, v, href }) => (
											<div key={k} className="flex items-center gap-2">
												<span className="min-w-6 font-semibold">{k}</span>
												<a href={href} className="flex-1 hover:underline">
													{v}
												</a>
											</div>
										))}
										<div className="flex items-center gap-2">
											<span className="min-w-6 font-semibold">S:</span>
											<span className="flex-1">
												<a
													href={`https://${personalInfo.linkedin}`}
													className="hover:underline">
													LinkedIn
												</a>
												<span className="mx-1">|</span>
												<a
													href={`https://${personalInfo.github}`}
													className="hover:underline">
													GitHub
												</a>
											</span>
										</div>
									</address>
								</div>
							</div>

							<Heading>Summary</Heading>
							<p className="text-[0.95rem]">{personalInfo.summary}</p>
						</header>

						{/* ---------- two columns ---------- */}
						<div className="mb-6 flex items-start justify-between gap-8">
							<div className="flex-1">
								<section className="mb-6">
									<Heading>Professional Experience</Heading>
									{experience.map((job) => (
										<div key={job.position + job.company} className="job mb-6">
											<div className="job-header flex items-baseline justify-between">
												<h4 className="m-0 text-[1.1rem] font-bold">
													{job.position}
													{job.company && ` at ${job.company}`}
												</h4>
												{job.period && (
													<span className="text-xs italic tabular-nums">
														{job.period}
													</span>
												)}
											</div>

											<p className="job-description mb-2 text-[0.875rem]">
												{job.description}
											</p>

											{job.highlights && (
												<ul className="highlights list-square pl-4">
													{job.highlights.map((h, i) => (
														<li key={i} className="highlight text-[0.875rem]">
															{h}
														</li>
													))}
												</ul>
											)}

											{job.projects && (
												<ul>
													{job.projects.map((p) => (
														<li
															key={p.name}
															className="mb-4 ml-4 list-square text-[0.875rem] break-inside-avoid">
															<div className="flex items-baseline justify-between gap-4">
																<a
																	href={`https://www.${p.name.toLowerCase()}`}
																	target="_blank"
																	rel="noreferrer"
																	className="font-bold hover:underline">
																	{p.name}
																</a>
																{'date' in p && (
																	<span className="shrink-0 text-xs italic tabular-nums">
																		{(p as { date: string }).date}
																	</span>
																)}
															</div>
															<p className="text-[0.875rem]">{p.description}</p>
														</li>
													))}
												</ul>
											)}
										</div>
									))}
								</section>
							</div>

							<div className="w-50 self-start">
								<section className="mb-6 break-inside-avoid">
									<Heading>Core Skills</Heading>
									{expertise.coreSkills.map((group) => (
										<div
											key={group.group}
											className="mb-1 flex flex-col text-[0.85rem] leading-normal">
											<span className="font-bold">{group.group}:</span>
											{group.skills.join(', ')}
										</div>
									))}
								</section>

								<section className="education-section mb-6 break-inside-avoid">
									<Heading>Education &amp; Self Learning</Heading>
									<ul>
										{education.map((edu) => (
											<li
												key={edu.institution + edu.program}
												className="education-item mb-1 flex flex-col items-start text-[0.875rem] last:mb-0">
												<span className="font-bold">{edu.institution}</span>
												{edu.program && (
													<span className="italic"> {edu.program}</span>
												)}
												{'completionDate' in edu && (
													<span className="text-xs italic">
														(
														{(edu as { completionDate: string }).completionDate}
														)
													</span>
												)}
											</li>
										))}
									</ul>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
