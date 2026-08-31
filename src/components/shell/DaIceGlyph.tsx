import './DaIceGlyph.css';

type Props = {
	size?: number;
	className?: string;
};

/**
 * Tumbler with "D" and "A" ice cubes. Motion is in DaIceGlyph.css.
 *
 * Self-contained on purpose — this is headed for a web component. Styles are
 * co-located, colours are currentColor, and letters fall back to a literal if
 * --ice-letter is absent. Only external hook is `:root.input-active`.
 */
export function DaIceGlyph({ size = 36, className }: Props) {
	return (
		<svg
			viewBox="0 0 64 64"
			width={size}
			height={size}
			aria-hidden="true"
			className={className}
			style={{ '--ice-letter': 'var(--canvas, #fcfdfb)' } as React.CSSProperties}
		>
			{/* Tumbler body */}
			<path
				d="M 10 16 L 14 56 L 50 56 L 54 16"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.6}
				strokeLinejoin="round"
				strokeLinecap="round"
			/>
			{/* Top rim ellipse */}
			<ellipse
				cx="32"
				cy="16"
				rx="22"
				ry="3"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.6}
			/>
			{/* Chiseled facet lines */}
			<line x1="20" y1="20" x2="22" y2="50" stroke="currentColor" strokeWidth={1} opacity={0.5} />
			<line x1="32" y1="20" x2="32" y2="52" stroke="currentColor" strokeWidth={1} opacity={0.5} />
			<line x1="44" y1="20" x2="42" y2="50" stroke="currentColor" strokeWidth={1} opacity={0.5} />

			{/* Lower two sit on the glass floor (y=56); top one lifted for headroom. */}
			<g className="ice-cube ice-cube-top">
				<rect x="23" y="23" width="16" height="16" rx="2.5" fill="currentColor" opacity={0.92} />
			</g>

			{/* Ice cube — D */}
			<g className="ice-cube ice-cube-d">
				<rect x="15" y="37" width="16" height="16" rx="2.5" fill="currentColor" opacity={0.92} />
				<text
					x="23"
					y="49"
					textAnchor="middle"
					fontSize="11"
					fontWeight={700}
					fill="var(--ice-letter)"
					style={{ fontFamily: 'var(--font-bricolage), system-ui, sans-serif' }}
				>
					D
				</text>
			</g>

			{/* Ice cube — A */}
			<g className="ice-cube ice-cube-a">
				<rect x="32" y="40" width="16" height="16" rx="2.5" fill="currentColor" opacity={0.92} />
				<text
					x="40"
					y="52"
					textAnchor="middle"
					fontSize="11"
					fontWeight={700}
					fill="var(--ice-letter)"
					style={{ fontFamily: 'var(--font-bricolage), system-ui, sans-serif' }}
				>
					A
				</text>
			</g>
		</svg>
	);
}

export default DaIceGlyph;
