/**
 * Renders `**bold**` spans without pulling in a markdown dependency.
 *
 * Shared by the deep dives and the lab posts so typography can't drift
 * between the two — both are hand-authored TS prose, and this is the whole of
 * the syntax they support.
 */
export default function Prose({ text }: { text: string }) {
	const parts = text.split(/(\*\*[^*]+\*\*)/g);
	return (
		<>
			{parts.map((part, i) =>
				part.startsWith('**') && part.endsWith('**') ? (
					<strong key={i} className="font-semibold text-ink">
						{part.slice(2, -2)}
					</strong>
				) : (
					part
				)
			)}
		</>
	);
}
