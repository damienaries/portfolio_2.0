/**
 * Deep dives — the long-form write-ups behind selected projects.
 *
 * Content lives in typed TS modules rather than the project JSON: prose in JSON
 * is miserable to edit, and this keeps paragraphs readable in the editor with
 * no new build config. If these grow past a handful, MDX is the upgrade path
 * and this shape maps onto it cleanly.
 *
 * The section order follows what an interviewer actually asks, in order.
 */

export interface DeepDiveSection {
	/** Section heading, e.g. "The problem". */
	heading: string;
	/** One string per paragraph. */
	body: string[];
}

export interface DeepDive {
	/** Must match the project's slug in portfolio_data_copy.json. */
	slug: string;
	/** Standfirst under the title — one or two sentences. */
	intro: string;
	sections: DeepDiveSection[];
	/** Short, concrete. Shown as a list near the end. */
	outcomes?: string[];
	/** The honest bit. Interviewers ask this and most portfolios dodge it. */
	wouldChange?: string[];
}
