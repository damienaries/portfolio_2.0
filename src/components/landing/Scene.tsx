import ScenePoster from './ScenePoster';

/**
 * The 3D boundary.
 *
 * Fills its positioned parent edge-to-edge. Everything the landing needs —
 * layout, type, the Enter control, responsive behaviour — is built against this
 * rendering a static poster.
 *
 * Phase 4 swaps the poster for the R3F canvas here and nowhere else:
 *
 *   const Character = dynamic(() => import('../three/Character'), {
 *     ssr: false,
 *     loading: () => <ScenePoster />,
 *   });
 *
 * The poster stays as the loading, reduced-motion and no-WebGL fallback.
 */

export default function Scene() {
	return (
		<div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
			<ScenePoster />
		</div>
	);
}
