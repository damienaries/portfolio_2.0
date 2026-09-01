'use client';

import Button from '@/components/ui/Button';

/**
 * The only way to get a copy, deliberately — a static PDF in /public had drifted
 * months behind the JSON. Print dialogs offer "Save as PDF", so this covers both.
 *
 * Hidden below `sm`: the sheet is zoomed out to fit there, and the print widget
 * inherits that scale. Mobile needs its own answer — emailing a copy, probably.
 */
export default function PrintButton() {
	return (
		/* Wrapper, not `hidden` on the Button: that class ties with the button's
		   own `inline-flex` and stylesheet order picks the winner. */
		<span className="hidden sm:block">
			<Button
			variant="glass"
			onClick={() => window.print()}
			title="Opens your print dialog — choose Save as PDF to download"
			className="print-button hidden lg:inline-flex print:hidden">
				Print
			</Button>
		</span>
	);
}
