/**
 * The 3D boundary.
 *
 * Everything the landing page needs — layout, type, the Enter control, responsive
 * behaviour — is built against this component rendering a static poster. When the
 * GLB is ready, the only change is importing the R3F canvas here behind
 * `next/dynamic({ ssr: false })` and rendering it in place of <ScenePoster />,
 * with the poster staying as the loading and fallback state.
 *
 * Nothing outside this file knows whether the scene is 3D or an image.
 */

import ScenePoster from './ScenePoster';

// Phase 4:
// const Character = dynamic(() => import('../three/Character'), {
//   ssr: false,
//   loading: () => <ScenePoster />,
// });

export default function Scene() {
	return (
		<div
			className="relative w-full aspect-square max-h-[68vh] mx-auto lg:mx-0 lg:max-w-none"
			aria-hidden="true"
		>
			<ScenePoster />
		</div>
	);
}
