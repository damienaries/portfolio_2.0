import './DaIceGlyph.css';

type Props = {
	size?: number;
	className?: string;
};

/**
 * Tumbler glass with "D" and "A" ice cubes that rattle on a subtle loop.
 *
 * Kept deliberately self-contained, since this is headed for a web component to
 * be shared across sites and used as a signature on freelance work: styles are
 * co-located and imported here rather than registered by the app layout, the
 * glass and cubes are currentColor, and the letters read --ice-letter with a
 * hard-coded fallback so the mark survives being dropped into a page that knows
 * nothing about this site's tokens. The one external hook left is
 * `:root.input-active`, which becomes a host attribute inside a custom element.
 *
 * Ported from the Swizzle component. Three changes for this codebase:
 *
 * 1. Motion is CSS keyframes rather than motion/react, so this stays a server
 *    component. An infinite decorative loop driven by rAF would run on every
 *    page for the life of the session; the keyframes are the same shape.
 * 2. Letters use --canvas rather than --color-palm, which doesn't exist here.
 *    Knocking them out of the cube keeps contrast whatever colour the nav
 *    inherits — jade on an ink cube would be near-illegible at 10px.
 * 3. transform-origin is `center`. The original set `24px 38px` alongside
 *    transformBox: fill-box, which resolves against a 14x14 box — the cube was
 *    pivoting from well outside itself.
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

			{/* Three cubes at 16px, overlapping so the glass reads as full, and
			    sitting on the base rather than floating near the rim. The lower
			    two are as low as they go — the A cube's edge lands exactly on
			    y=56, the glass floor — and the top one is lifted 3px to open a
			    little headroom under the rim. */}
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
