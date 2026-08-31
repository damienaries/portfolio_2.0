/**
 * Deep dives — the long-form write-ups behind selected projects.
 *
 * House structure is a narrative arc, not an interview checklist:
 *
 *   Where it started      the situation, and what was wrong with it
 *   What I wanted to build the intent
 *   How I built it        what I actually did and decided
 *   Where it led          what came of it
 *
 * Headings are per-project, not enforced — a project whose story doesn't fit
 * that shape should use its own. There is deliberately no mandatory
 * lessons-learned section and no KPI box: `outcomes` and `wouldChange` exist
 * for projects that genuinely have them, and are omitted otherwise rather than
 * padded out.
 *
 * Content lives in typed TS modules rather than the project JSON: prose in JSON
 * is miserable to edit, and this keeps paragraphs readable in the editor with
 * no new build config. If these grow past a handful, MDX is the upgrade path
 * and this shape maps onto it cleanly.
 */

export interface DeepDiveSection {
	/** Section heading, e.g. "Where it started". */
	heading: string;
	/** One string per paragraph. `**bold**` renders at the start of a line. */
	body: string[];
}

export interface DeepDive {
	/** Must match the project's slug in portfolio_data_copy.json. */
	slug: string;
	/** Standfirst under the title — one or two sentences. */
	intro: string;
	sections: DeepDiveSection[];
	/** Optional. Only where there is something concrete to say. */
	outcomes?: string[];
	/** Optional. Only where the honest answer adds something. */
	wouldChange?: string[];
}
