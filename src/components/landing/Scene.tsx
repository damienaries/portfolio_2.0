import ScenePoster from './ScenePoster';

/**
 * The 3D boundary. Everything else on the landing is built against this
 * rendering a static poster, so the R3F canvas swaps in here and nowhere else:
 *
 *   const Character = dynamic(() => import('../three/Character'), {
 *     ssr: false, loading: () => <ScenePoster />,
 *   });
 */

export default function Scene() {
	return (
		<div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
			<ScenePoster />
		</div>
	);
}
