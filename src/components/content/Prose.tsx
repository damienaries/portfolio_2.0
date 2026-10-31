/**
 * Renders `**bold**` spans and `[label](url)` links without pulling in a
 * markdown dependency.
 *
 * Shared by the deep dives and the lab posts so typography can't drift
 * between the two — both are hand-authored TS prose, and this is the whole of
 * the syntax they support. Links exist for credits: an absolute URL opens in a
 * new tab, a site path stays in this one.
 */
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;
const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

export default function Prose({ text }: { text: string }) {
	const parts = text.split(TOKEN);
	return (
		<>
			{parts.map((part, i) => {
				if (part.startsWith('**') && part.endsWith('**')) {
					return (
						<strong key={i} className="font-semibold text-ink">
							{part.slice(2, -2)}
						</strong>
					);
				}

				const link = part.match(LINK);
				if (link) {
					const [, label, href] = link;
					const external = /^https?:\/\//.test(href);
					return (
						<a
							key={i}
							href={href}
							{...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
							className="text-ink underline decoration-line underline-offset-4
							           hover:text-jade hover:decoration-jade
							           transition-colors duration-(--dur-fast)">
							{label}
						</a>
					);
				}

				return part;
			})}
		</>
	);
}
