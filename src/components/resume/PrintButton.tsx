'use client';

/**
 * The only way to get a copy of the résumé, deliberately.
 *
 * A static PDF in /public was serving a seven-month-old document while the page
 * showed current content — two sources of truth, one silently stale. This
 * renders the live page, so what you save is always what you just read.
 *
 * Every major browser's print dialog offers "Save as PDF" as a destination,
 * mobile included, so this covers both printing and downloading.
 */
export default function PrintButton() {
	return (
		<button
			type="button"
			onClick={() => window.print()}
			title="Opens your print dialog — choose Save as PDF to download"
			className="shimmer print-button glass glass-pill cursor-pointer px-4 py-1.5 font-mono text-label tracking-widest
			           uppercase text-muted transition-colors duration-(--dur-fast)
			           hover:text-ink print:hidden">
			Print
		</button>
	);
}
