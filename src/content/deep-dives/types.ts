/**
 * Deep dives. Default heading arc: where it started → what I wanted to build →
 * how I built it → where it led. Per-project, not enforced.
 *
 * Prose lives in TS rather than JSON because JSON strings are painful to edit.
 * MDX is the upgrade path if these grow.
 */

export interface DeepDiveSection {
	heading: string;
	/** One string per paragraph. `**bold**` is supported. */
	body: string[];
}

export interface DeepDive {
	/** Must match the project's slug in portfolio_data_copy.json. */
	slug: string;
	/** Standfirst under the title. */
	intro: string;
	sections: DeepDiveSection[];
	/** Both optional — omit rather than pad. */
	outcomes?: string[];
	wouldChange?: string[];
}
