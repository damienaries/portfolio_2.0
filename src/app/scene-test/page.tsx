import type { Metadata } from 'next';
import SceneCanvas from './SceneCanvas';

export const metadata: Metadata = {
	title: '3D scene test',
	robots: { index: false, follow: false },
};

export default function SceneTestPage() {
	return (
		<main style={{ height: '100dvh', position: 'relative', background: '#17252b' }}>
			<SceneCanvas />
		</main>
	);
}
