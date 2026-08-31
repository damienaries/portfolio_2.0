'use client';

import Button from '@/components/ui/Button';

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
		<Button
			variant="glass"
			onClick={() => window.print()}
			title="Opens your print dialog — choose Save as PDF to download"
			className="print-button print:hidden">
			Print
		</Button>
	);
}
