const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

function parseYearMonth(value) {
	if (!value) return null;
	const match = String(value).match(/^(\d{4})-(\d{2})/);
	if (!match) return null;
	return { year: parseInt(match[1], 10), month: parseInt(match[2], 10) };
}

function formatMonthYear(value) {
	const ym = parseYearMonth(value);
	if (!ym) return '';
	return `${MONTHS[ym.month - 1]} ${ym.year}`;
}

function formatMmYyyy(value) {
	const ym = parseYearMonth(value);
	if (!ym) return '';
	return `${String(ym.month).padStart(2, '0')}/${ym.year}`;
}

export function formatProjectDate(meta) {
	if (!meta) return '';
	if (meta.kind === 'range') {
		if (!meta.startedAt) return '';
		if (!meta.endedAt) return `Since ${formatMonthYear(meta.startedAt)}`;
		return `${formatMonthYear(meta.startedAt)} – ${formatMonthYear(meta.endedAt)}`;
	}
	const prefix = meta.kind === 'updated' ? 'Updated' : 'Created';
	return `${prefix} ${formatMmYyyy(meta.date)}`;
}
