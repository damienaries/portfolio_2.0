import type { DeepDive } from './types';
import { swizzle } from './swizzle';
import { habitTracker } from './habit-tracker';
import { concept } from './concept';
import { leaderInstitute } from './leader-institute';
import { judiBoisson } from './judi-boisson';
import { careyCorea } from './carey-corea';
import { coreaCreative } from './corea-creative';

/**
 * Registry of deep dives. A project gets a "Read the deep dive" link on /work
 * only when its slug appears here, so half-written pages can't leak.
 *
 * Order is roughly by weight — Swizzle is the substantial product story, the
 * smaller product and client pieces are deliberately shorter. Length carries
 * the hierarchy, so don't level them up.
 */
const DEEP_DIVES: DeepDive[] = [
	swizzle,
	habitTracker,
	concept,
	leaderInstitute,
	judiBoisson,
	careyCorea,
	coreaCreative,
];

export const deepDiveBySlug = new Map(DEEP_DIVES.map((d) => [d.slug, d]));

export const deepDiveSlugs = DEEP_DIVES.map((d) => d.slug);

export function getDeepDive(slug: string): DeepDive | undefined {
	return deepDiveBySlug.get(slug);
}

export type { DeepDive, DeepDiveSection } from './types';
