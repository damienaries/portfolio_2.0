import type { DeepDive } from './types';
import { swizzle } from './swizzle';

/**
 * Registry of deep dives. A project gets a "Read the deep dive" link on /work
 * only when its slug appears here, so half-written pages can't leak.
 */
const DEEP_DIVES: DeepDive[] = [swizzle];

export const deepDiveBySlug = new Map(DEEP_DIVES.map((d) => [d.slug, d]));

export const deepDiveSlugs = DEEP_DIVES.map((d) => d.slug);

export function getDeepDive(slug: string): DeepDive | undefined {
	return deepDiveBySlug.get(slug);
}

export type { DeepDive, DeepDiveSection } from './types';
