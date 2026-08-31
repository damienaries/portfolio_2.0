'use client';

import Button from '@/components/ui/Button';

/**
 * The only way to get a copy, deliberately — a static PDF in /public had drifted
 * months behind the JSON. Print dialogs offer "Save as PDF", so this covers both.
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
