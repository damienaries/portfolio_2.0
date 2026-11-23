'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Button from '@/components/ui/Button';
import StreetJoystick from './StreetJoystick';
import streetPoints from './street-path.json';
import styles from './scene-test.module.css';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function disposeModel(model: THREE.Object3D) {
	const geometries = new Set<THREE.BufferGeometry>();
	const materials = new Set<THREE.Material>();
	const textures = new Set<THREE.Texture>();
	model.traverse((object) => {
		if (!(object instanceof THREE.Mesh)) return;
		geometries.add(object.geometry);
		const meshMaterials = Array.isArray(object.material) ? object.material : [object.material];
		meshMaterials.forEach((material) => {
			materials.add(material);
			Object.values(material).forEach((value) => {
				if (value instanceof THREE.Texture) textures.add(value);
			});
		});
	});
	geometries.forEach((geometry) => geometry.dispose());
	materials.forEach((material) => material.dispose());
	textures.forEach((texture) => texture.dispose());
}

export default function SceneCanvas() {
	const joystickRef = useRef<(turn: number, walk: number) => void>(() => {});
	const navigationRef = useRef<(key: string, down: boolean) => void>(() => {});
	const resetViewRef = useRef<() => void>(() => {});
	const [loadFailed, setLoadFailed] = useState(false);
	const [travel, setTravel] = useState(0);
	const aboutMarkerRef = useRef<HTMLAnchorElement>(null);
	const [awayFromStart, setAwayFromStart] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [pixelRatio, setPixelRatio] = useState('1');
	const changePixelRatioRef = useRef<(value: number) => void>(() => {});
	const [metrics, setMetrics] = useState({ loadMs: 0, calls: 0, triangles: 0, submitMs: 0 });
	const [birdStatus, setBirdStatus] = useState('Birds waiting for neighborhood');
	const [flight, setFlight] = useState({ fps: 0, frameMs: 0 });
	const [birdsPaused, setBirdsPaused] = useState(false);
	const toggleBirdsRef = useRef<() => void>(() => {});
	const [revealed, setRevealed] = useState(false);
	const [stage, setStage] = useState('Preparing the neighborhood…');
	const [stages, setStages] = useState<Record<string, number>>({});
	const [status, setStatus] = useState('Starting 3D renderer…');

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let renderer: THREE.WebGLRenderer;
		try {
			renderer = new THREE.WebGLRenderer({ antialias: true });
		} catch {
			setLoadFailed(true);
			setStatus(
				'The 3D renderer could not start. Check that browser hardware acceleration is enabled.',
			);
			return;
		}

		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
		renderer.domElement.style.display = 'block';
		renderer.domElement.setAttribute('aria-label', 'Los Angeles hillside neighborhood');
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFShadowMap;
		renderer.shadowMap.autoUpdate = false;
		container.appendChild(renderer.domElement);

		const scene = new THREE.Scene();
		scene.background = new THREE.Color('#b9b5ad');
		// Match the Blender environment rotation after converting Z-up to Y-up.
		scene.backgroundRotation.y = THREE.MathUtils.degToRad(83.60546875);
		scene.environmentRotation.copy(scene.backgroundRotation);
		scene.backgroundIntensity = 0.65;
		scene.environmentIntensity = 0.65;
		let environment: THREE.DataTexture | undefined;
		// Keep a small device-independent fill under the HDR lighting. This is
		// intentionally subtle on desktop, but prevents unlit silhouettes when a
		// mobile GPU cannot sample an HDR environment as expected.
		const skyFill = new THREE.HemisphereLight('#e6d5bd', '#405b45', 0.35);
		scene.add(skyFill);
		// Blender's Z-up coordinates become glTF's Y-up coordinates (x, z, -y).
		// The exported file omitted cameras, so use the saved 32mm landing view.
		const verticalFov = THREE.MathUtils.radToDeg(2 * Math.atan(36 / (2 * 32 * 1.6)));
		const camera = new THREE.PerspectiveCamera(verticalFov, 1, 0.1, 1000);
		camera.position.set(-9.483677, 11.3192, 48);
		camera.lookAt(camera.position.clone().add(new THREE.Vector3(0.130586, -0.007413, -0.991409)));
		const sun = new THREE.DirectionalLight(new THREE.Color(1, 0.78, 0.52), 2.4);
		sun.target.position.set(0, 10, 0);
		const sunElevation = THREE.MathUtils.degToRad(4.5703125);
		const sunDirection = new THREE.Vector3(
			Math.cos(THREE.MathUtils.degToRad(43)),
			0,
			-Math.sin(THREE.MathUtils.degToRad(43)),
		).normalize();
		sunDirection.multiplyScalar(Math.cos(sunElevation));
		sunDirection.y = Math.sin(sunElevation);
		sun.position.copy(sun.target.position).addScaledVector(sunDirection, 250);
		sun.castShadow = true;
		sun.shadow.mapSize.set(2048, 2048);
		sun.shadow.camera.left = -100;
		sun.shadow.camera.right = 100;
		sun.shadow.camera.top = 100;
		sun.shadow.camera.bottom = -100;
		sun.shadow.camera.near = 1;
		sun.shadow.camera.far = 600;
		sun.shadow.normalBias = 0.3;
		sun.shadow.bias = -0.0003;
		scene.add(sun, sun.target);

		// Store static linear color and depth. Only rebuild when the camera/view changes.
		const cachedView = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType });
		cachedView.depthTexture = new THREE.DepthTexture(1, 1, THREE.UnsignedIntType);
		const composite = new THREE.Scene();
		const compositeCamera = new THREE.Camera();
		const compositeMaterial = new THREE.ShaderMaterial({
			uniforms: {
				colorMap: { value: cachedView.texture },
				depthMap: { value: cachedView.depthTexture },
			},
			vertexShader: `varying vec2 vUv;
				void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
			fragmentShader: `uniform sampler2D colorMap;
				uniform sampler2D depthMap;
				varying vec2 vUv;
				void main() {
					gl_FragColor = texture2D(colorMap, vUv);
					gl_FragDepth = texture2D(depthMap, vUv).r;
					#include <tonemapping_fragment>
					#include <colorspace_fragment>
				}`,
			depthTest: true,
			depthWrite: true,
			depthFunc: THREE.AlwaysDepth,
		});
		const quadGeometry = new THREE.PlaneGeometry(2, 2);
		const quad = new THREE.Mesh(quadGeometry, compositeMaterial);
		quad.frustumCulled = false;
		composite.add(quad);
		const animatedScene = new THREE.Scene();
		const birdSun = sun.clone();
		birdSun.castShadow = false;
		birdSun.target = sun.target.clone();
		const birdSkyFill = skyFill.clone();
		animatedScene.add(birdSun, birdSun.target, birdSkyFill);
		let cacheDirty = true;
		const cachedProjection = new THREE.Matrix4();
		const cachedCamera = new THREE.Matrix4();
		renderer.info.autoReset = false;
		const draw = () => {
			camera.updateMatrixWorld();
			renderer.info.reset();
			if (
				!cachedProjection.equals(camera.projectionMatrix) ||
				!cachedCamera.equals(camera.matrixWorld)
			)
				cacheDirty = true;
			if (cacheDirty) {
				renderer.setRenderTarget(cachedView);
				renderer.autoClear = true;
				renderer.render(scene, camera);
				renderer.setRenderTarget(null);
				cachedProjection.copy(camera.projectionMatrix);
				cachedCamera.copy(camera.matrixWorld);
				cacheDirty = false;
			}
			// Include cache rebuilds in diagnostics while navigating.
			renderer.autoClear = true;
			renderer.render(composite, compositeCamera);
			renderer.autoClear = false;
			renderer.render(animatedScene, camera);
			renderer.autoClear = true;
		};

		const origin = camera.position.clone();
		// Keep the first steps aligned with the landing view, then join the road
		// eight metres ahead. The previous first waypoint was almost sideways.
		const forward = new THREE.Vector3(0.130586, -0.007413, -0.991409).normalize();
		const route = new THREE.CatmullRomCurve3([
			origin,
			origin.clone().addScaledVector(forward, 2),
			origin.clone().addScaledVector(forward, 4),
			...streetPoints
				.filter((p) => p[2] <= 40 && p[2] >= -18.75)
				.map((p) => new THREE.Vector3(...(p as [number, number, number]))),
		]);
		const aboutAnchor = new THREE.Vector3();
		let doorHighlight: THREE.LineSegments | undefined;
		const doorMaterial = new THREE.LineBasicMaterial({
			color: '#ffdf9e',
			transparent: true,
			opacity: 0.75,
		});
		const sightRay = new THREE.Raycaster();
		const occluders: THREE.Object3D[] = [];
		let doorVisible = false;
		let lastSightKey = '';
		const projectedAbout = new THREE.Vector3();
		const routeLength = route.getLength();
		let distance = 0;
		let yaw = 0;
		let speed = 0;
		const held = new Set<string>();
		const joystick = { turn: 0, walk: 0 };
		const updateCamera = () => {
			const t = distance / routeLength;
			camera.position.copy(route.getPointAt(t));
			// Look several metres ahead instead of following tiny local spline changes.
			const ahead = route.getPointAt(Math.min((distance + 5) / routeLength, 1));
			const tangent = ahead.sub(camera.position);
			if (tangent.lengthSq() < 0.001) tangent.copy(route.getTangentAt(1));
			const portrait = camera.aspect < 0.85;
			const initial = new THREE.Vector3(
				...((portrait ? [0.22, -0.055, -0.974] : [0.130586, -0.007413, -0.991409]) as [
					number,
					number,
					number,
				]),
			);
			const direction = initial.lerp(tangent.normalize(), Math.min(distance / 8, 1)).normalize();
			const arrival = THREE.MathUtils.smoothstep(distance, routeLength - 14, routeLength);
			const houseDirection = aboutAnchor.clone().sub(camera.position).normalize();
			direction.lerp(houseDirection, arrival).normalize();
			direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
			camera.lookAt(camera.position.clone().add(direction));
			camera.updateMatrixWorld();
			const marker = aboutMarkerRef.current;
			if (marker && doorHighlight) {
				projectedAbout.copy(aboutAnchor).project(camera);
				const doorDistance = camera.position.distanceTo(aboutAnchor);
				// Only raycast after movement, not on every bird-animation frame.
				const sightKey = `${distance.toFixed(2)}:${yaw.toFixed(3)}:${camera.aspect}`;
				if (sightKey !== lastSightKey) {
					lastSightKey = sightKey;
					sightRay.set(camera.position, aboutAnchor.clone().sub(camera.position).normalize());
					sightRay.far = Math.max(0, doorDistance - 0.4);
					doorVisible = sightRay.intersectObjects(occluders, false).length === 0;
				}
				const visible =
					doorVisible &&
					projectedAbout.z > -1 &&
					projectedAbout.z < 1 &&
					Math.abs(projectedAbout.x) < 0.92 &&
					Math.abs(projectedAbout.y) < 0.9;
				const ready = visible && doorDistance < 19;
				marker.hidden = !visible;
				marker.dataset.ready = String(ready);
				marker.tabIndex = ready ? 0 : -1;
				marker.setAttribute('aria-disabled', String(!ready));
				marker.style.left = (projectedAbout.x + 1) * 50 + '%';
				marker.style.top = (1 - projectedAbout.y) * 50 + '%';
			}
		};

		let revealFrame = 0;
		setRevealed(false);
		const yieldToBrowser = () => new Promise<void>((resolve) => setTimeout(resolve, 0));
		let modelReady = false;
		let loadMs = 0;
		// Draw on model load and resize rather than running a continuous frame loop.
		const resize = () => {
			const { width, height } = container.getBoundingClientRect();
			if (width === 0 || height === 0) return;
			renderer.setSize(width, height);
			const bufferSize = renderer.getDrawingBufferSize(new THREE.Vector2());
			if (cachedView.width !== bufferSize.x || cachedView.height !== bufferSize.y) {
				cachedView.setSize(bufferSize.x, bufferSize.y);
				cacheDirty = true;
			}
			camera.aspect = width / height;
			const portrait = camera.aspect < 0.85;
			// Cap horizontal field of view on wide screens, which otherwise expose
			// the unfinished sides even when the camera itself cannot turn far.
			const wideScreenFov = THREE.MathUtils.radToDeg(
				2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(34)) / camera.aspect),
			);
			camera.fov = portrait ? 66 : Math.min(verticalFov, wideScreenFov);
			camera.updateProjectionMatrix();
			updateCamera();
			const submitStart = performance.now();
			draw();
			if (modelReady) {
				setMetrics({
					loadMs,
					calls: renderer.info.render.calls,
					triangles: renderer.info.render.triangles,
					submitMs: performance.now() - submitStart,
				});
			}
		};
		changePixelRatioRef.current = (value) => {
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, value));
			resize();
		};
		const observer = new ResizeObserver(resize);
		observer.observe(container);
		resize();
		let disposed = false;
		let model: THREE.Group | undefined;
		const abortController = new AbortController();
		setStatus('Loading LA-hills-web-v3.glb…');
		let birds: THREE.Group | undefined;
		let mixer: THREE.AnimationMixer | undefined;
		let animationFrame = 0;
		let lastFrame = 0;
		let sampleStart = 0;
		let sampleFrames = 0;
		let sampleCpu = 0;
		let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		setBirdsPaused(paused);
		const animate = (now: number) => {
			if (disposed || document.hidden || !modelReady) return;
			const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.1) : 0;
			if (!paused && mixer) mixer.update(dt);
			const walkingInput = THREE.MathUtils.clamp(
				Number(held.has('w')) - Number(held.has('s')) + joystick.walk,
				-1,
				1,
			);
			const desiredSpeed = walkingInput * (held.has('run') ? 7 : 4.5);
			if (doorHighlight) doorMaterial.opacity = paused ? 0.7 : 0.65 + Math.sin(now * 0.002) * 0.2;
			speed = THREE.MathUtils.damp(speed, desiredSpeed, 9, dt);
			if (Math.abs(speed) < 0.01) speed = 0;
			distance = THREE.MathUtils.clamp(distance + speed * dt, 0, routeLength);
			yaw = THREE.MathUtils.clamp(
				yaw + (Number(held.has('a')) - Number(held.has('d')) + joystick.turn) * dt * 0.7,
				THREE.MathUtils.degToRad(-10),
				THREE.MathUtils.degToRad(10),
			);
			setAwayFromStart(distance > 0.02 || Math.abs(yaw) > 0.005);
			updateCamera();
			lastFrame = now;
			const cpuStart = performance.now();
			draw();
			sampleCpu += performance.now() - cpuStart;
			sampleFrames++;
			if (!sampleStart) sampleStart = now;
			if (now - sampleStart >= 1000) {
				const elapsed = now - sampleStart;
				setFlight({ fps: (sampleFrames * 1000) / elapsed, frameMs: elapsed / sampleFrames });
				const frameMetrics = {
					calls: renderer.info.render.calls,
					triangles: renderer.info.render.triangles,
					submitMs: sampleCpu / sampleFrames,
				};
				setMetrics((previous) => ({ ...previous, ...frameMetrics }));
				setTravel(Math.round(distance));
				sampleStart = now;
				sampleFrames = 0;
				sampleCpu = 0;
			}
			animationFrame = 0;
			if (
				(!paused && (mixer || doorHighlight)) ||
				held.size ||
				joystick.walk ||
				joystick.turn ||
				speed
			)
				animationFrame = requestAnimationFrame(animate);
		};
		const syncPlayback = () => {
			cancelAnimationFrame(animationFrame);
			animationFrame = 0;
			lastFrame = 0;
			sampleStart = 0;
			sampleFrames = 0;
			sampleCpu = 0;
			if (
				!document.hidden &&
				modelReady &&
				((!paused && (mixer || doorHighlight)) ||
					held.size ||
					joystick.walk ||
					joystick.turn ||
					speed)
			)
				animationFrame = requestAnimationFrame(animate);
		};
		toggleBirdsRef.current = () => {
			paused = !paused;
			setBirdsPaused(paused);
			syncPlayback();
		};
		const clearInput = () => {
			held.clear();
			joystick.walk = joystick.turn = 0;
			speed = 0;
			syncPlayback();
		};
		const handleVisibility = () => {
			if (document.hidden) clearInput();
			else syncPlayback();
		};
		document.addEventListener('visibilitychange', handleVisibility);
		const keyMap: Record<string, string> = {
			' ': 'run',
			ArrowUp: 'w',
			ArrowDown: 's',
			ArrowLeft: 'a',
			ArrowRight: 'd',
			w: 'w',
			s: 's',
			a: 'a',
			d: 'd',
		};
		navigationRef.current = (key, down) => {
			if (!modelReady) return;
			if (down) held.add(key);
			else held.delete(key);
			if (!animationFrame) syncPlayback();
		};
		joystickRef.current = (turn, walk) => {
			if (!modelReady) return;
			joystick.turn = turn;
			joystick.walk = walk;
			if (!animationFrame) syncPlayback();
		};
		const keyDown = (event: KeyboardEvent) => {
			if (
				event.target instanceof HTMLElement &&
				event.target.closest('input, select, textarea, button, a, [contenteditable]')
			)
				return;
			const key = keyMap[event.key] ?? keyMap[event.key.toLowerCase()];
			if (!key || !modelReady) return;
			event.preventDefault();
			navigationRef.current(key, true);
		};
		const keyUp = (event: KeyboardEvent) => {
			const key = keyMap[event.key] ?? keyMap[event.key.toLowerCase()];
			if (key) navigationRef.current(key, false);
		};
		resetViewRef.current = () => {
			held.clear();
			joystick.walk = joystick.turn = 0;
			speed = 0;
			distance = 0;
			yaw = 0;
			setTravel(0);
			setAwayFromStart(false);
			updateCamera();
			draw();
		};
		window.addEventListener('keydown', keyDown);
		window.addEventListener('keyup', keyUp);
		window.addEventListener('blur', clearInput);

		async function loadBirds() {
			try {
				setBirdStatus('Loading birds…');
				const response = await fetch('/models/LA-birds-v1.glb', { signal: abortController.signal });
				if (!response.ok) throw new Error('Bird request failed');
				const data = await response.arrayBuffer();
				if (disposed) return;
				const gltf = await new GLTFLoader().parseAsync(data, '/models/');
				if (disposed) {
					disposeModel(gltf.scene);
					return;
				}
				birds = gltf.scene;
				birds.traverse((object) => {
					if (object instanceof THREE.Mesh) {
						object.castShadow = false;
						object.receiveShadow = false;
					}
				});
				animatedScene.add(birds);
				mixer = new THREE.AnimationMixer(birds);
				gltf.animations.forEach((clip) => mixer!.clipAction(clip).play());
				mixer.update(0);
				setBirdStatus('Birds loaded · ' + (data.byteLength / 1000).toFixed(0) + ' KB');
				resize();
				syncPlayback();
			} catch (error) {
				if (!disposed) {
					setBirdStatus('Birds unavailable; neighborhood still ready');
					console.error(error);
				}
			}
		}

		async function loadModel() {
			try {
				const loadStart = performance.now();
				const timings: Record<string, number> = {};
				setStage('Bringing the neighborhood into view…');
				const [response, skyResponse] = await Promise.all([
					fetch('/models/LA-hills-web-v3.glb', { signal: abortController.signal }),
					fetch('/environments/kloppenheim_06_puresky_1k.hdr', { signal: abortController.signal }),
				]);
				if (!response.ok || !skyResponse.ok) throw new Error('Model or HDRI request failed');
				const [data, skyData] = await Promise.all([
					response.arrayBuffer(),
					skyResponse.arrayBuffer(),
				]);
				if (disposed) return;
				timings['Fetch assets (parallel)'] = performance.now() - loadStart;
				setStage('Preparing houses and gardens…');
				await yieldToBrowser();
				const parseStart = performance.now();
				const gltf = await new GLTFLoader().parseAsync(data, '/models/');
				if (disposed) {
					disposeModel(gltf.scene);
					return;
				}
				timings['Decode model and textures'] = performance.now() - parseStart;
				setStage('Setting the evening sky…');
				await yieldToBrowser();
				if (disposed) {
					disposeModel(gltf.scene);
					return;
				}
				const skyStart = performance.now();
				const hdr = new HDRLoader().setDataType(THREE.FloatType).parse(skyData);
				const pixels = hdr.data as Float32Array;
				const mobilePixels = new Uint16Array(pixels.length);
				// Same gentle warm balance used in Blender's world material.
				for (let i = 0; i < pixels.length; i += 4) {
					mobilePixels[i] = THREE.DataUtils.toHalfFloat(pixels[i] * 1.06);
					mobilePixels[i + 1] = THREE.DataUtils.toHalfFloat(pixels[i + 1]);
					mobilePixels[i + 2] = THREE.DataUtils.toHalfFloat(pixels[i + 2] * 0.9);
					mobilePixels[i + 3] = THREE.DataUtils.toHalfFloat(pixels[i + 3]);
				}
				environment = new THREE.DataTexture(
					mobilePixels,
					hdr.width,
					hdr.height,
					THREE.RGBAFormat,
					THREE.HalfFloatType,
				);
				environment.mapping = THREE.EquirectangularReflectionMapping;
				environment.colorSpace = THREE.LinearSRGBColorSpace;
				environment.minFilter = THREE.LinearFilter;
				environment.magFilter = THREE.LinearFilter;
				environment.flipY = true;
				environment.needsUpdate = true;
				scene.background = environment;
				scene.environment = environment;
				animatedScene.environment = environment;
				animatedScene.environmentRotation.copy(scene.environmentRotation);
				animatedScene.environmentIntensity = scene.environmentIntensity;
				model = gltf.scene;
				model.traverse((object) => {
					if (object instanceof THREE.Mesh) {
						object.castShadow = true;
						object.receiveShadow = true;
					}
				});
				scene.add(model);
				model.updateMatrixWorld(true);
				const door = model.getObjectByName('H05_UpperEntryDoor');
				if (door) {
					const bounds = new THREE.Box3().setFromObject(door);
					bounds.getCenter(aboutAnchor);
					const size = bounds.getSize(new THREE.Vector3()).addScalar(0.08);
					const box = new THREE.BoxGeometry(size.x, size.y, size.z);
					doorHighlight = new THREE.LineSegments(new THREE.EdgesGeometry(box), doorMaterial);
					box.dispose();
					doorHighlight.position.copy(aboutAnchor);
					animatedScene.add(doorHighlight);
					model.traverse((object) => {
						if (object instanceof THREE.Mesh && object !== door) occluders.push(object);
					});
				}
				cacheDirty = true;
				timings['Decode and prepare sky'] = performance.now() - skyStart;
				setStage('Finishing the view…');
				await yieldToBrowser();
				if (disposed) return;
				const renderStart = performance.now();
				renderer.shadowMap.needsUpdate = true;
				resize();
				timings['First render submission + setup'] = performance.now() - renderStart;
				setStages(timings);
				loadMs = performance.now() - loadStart;
				revealFrame = requestAnimationFrame(() => {
					revealFrame = requestAnimationFrame(() => {
						if (!disposed) {
							setRevealed(true);
							void loadBirds();
						}
					});
				});
				modelReady = true;
				// Measure a normal static frame after the initial shadow-map render.
				resize();
				setStatus(
					`Neighborhood loaded · ${(data.byteLength / 1_000_000).toFixed(2)} MB model + ${(skyData.byteLength / 1_000_000).toFixed(2)} MB sky`,
				);
			} catch (error) {
				if (disposed) return;
				setLoadFailed(true);
				setStage('The neighborhood couldn’t load. Please refresh to try again.');
				console.error('Could not load the neighborhood', error);
				setStatus(
					'Could not load LA-hills-web-v3.glb. Check the file in public/models, then refresh.',
				);
			}
		}
		void loadModel();

		return () => {
			disposed = true;
			cancelAnimationFrame(revealFrame);
			cancelAnimationFrame(animationFrame);
			document.removeEventListener('visibilitychange', handleVisibility);
			window.removeEventListener('keydown', keyDown);
			window.removeEventListener('keyup', keyUp);
			window.removeEventListener('blur', clearInput);
			navigationRef.current = () => {};
			resetViewRef.current = () => {};
			toggleBirdsRef.current = () => {};
			changePixelRatioRef.current = () => {};
			if (mixer && birds) {
				mixer.stopAllAction();
				mixer.uncacheRoot(birds);
			}
			if (birds) disposeModel(birds);
			abortController.abort();
			observer.disconnect();
			if (model) disposeModel(model);
			doorHighlight?.geometry.dispose();
			doorMaterial.dispose();
			joystickRef.current = () => {};
			environment?.dispose();
			sun.shadow.dispose();
			cachedView.dispose();
			compositeMaterial.dispose();
			quadGeometry.dispose();
			renderer.dispose();
			renderer.domElement.remove();
		};
	}, []);

	return (
		<>
			<div className={styles.backdrop} aria-hidden="true" />
			<div
				className={`${styles.scene} ${revealed ? styles.revealed : ''}`}
				ref={containerRef}
				style={{ width: '100%', height: '100%' }}
			/>
			<div className={`${styles.loading} ${revealed ? styles.finished : ''}`} role="status">
				{revealed ? 'Neighborhood ready' : stage}
			</div>

			{(revealed || loadFailed) && (
				<section className={styles.intro} aria-label="Introduction">
					<h1 className="font-display text-3xl leading-[0.92] tracking-display text-balance">
						<span className="block font-normal text-xl tracking-tight text-jade">
							Hi, I&rsquo;m
						</span>
						<span className="font-extrabold">Damien Aries</span>
					</h1>
					<p className={styles.subtitle}>
						Developer, bartender, and chief experimentation officer.
					</p>
					<Button href="/work" size="lg" className="mt-2">
						Enter
					</Button>
				</section>
			)}
			{revealed && (
				<a
					ref={aboutMarkerRef}
					href="/about"
					className={styles.aboutMarker}
					hidden
					aria-label="About Damien"
					onClick={(event) => {
						if (event.currentTarget.dataset.ready !== 'true') event.preventDefault();
					}}
				>
					<span className={styles.aboutLabel}>
						About <span aria-hidden="true">↗</span>
					</span>
				</a>
			)}
			{revealed && (
				<nav className={styles.navigation} aria-label="Explore the street">
					<StreetJoystick onChange={(turn, walk) => joystickRef.current(turn, walk)} />
					<div className={styles.keyGrid}>
						{[
							{ key: 'w', arrow: '↑', label: 'Move forward' },
							{ key: 'a', arrow: '←', label: 'Look left' },
							{ key: 's', arrow: '↓', label: 'Move backward' },
							{ key: 'd', arrow: '→', label: 'Look right' },
						].map((control) => (
							<button
								key={control.key}
								onContextMenu={(event) => event.preventDefault()}
								className={styles[control.key]}
								aria-label={control.label}
								onPointerDown={(event) => {
									event.currentTarget.setPointerCapture(event.pointerId);
									navigationRef.current(control.key, true);
								}}
								onPointerUp={() => navigationRef.current(control.key, false)}
								onPointerCancel={() => navigationRef.current(control.key, false)}
								onLostPointerCapture={() => navigationRef.current(control.key, false)}
								onKeyDown={(event) => {
									if (event.key === ' ' || event.key === 'Enter') {
										event.preventDefault();
										navigationRef.current(control.key, true);
									}
								}}
								onKeyUp={() => navigationRef.current(control.key, false)}
								onBlur={() => navigationRef.current(control.key, false)}
							>
								<span aria-hidden="true">{control.arrow}</span>
								<kbd>{control.key.toUpperCase()}</kbd>
							</button>
						))}
					</div>

					{awayFromStart && (
						<button className={styles.reset} onClick={() => resetViewRef.current()}>
							Back to start
						</button>
					)}
				</nav>
			)}

			<details className={styles.metrics}>
				<summary>Scene diagnostics</summary>
				<p role="status">{status}</p>
				<p>{birdStatus}</p>
				<p>Street position: {travel} m · bounded route to the yellow house</p>
				<label>
					Render pixel ratio cap{' '}
					<select
						value={pixelRatio}
						onChange={(event) => {
							setPixelRatio(event.target.value);
							changePixelRatioRef.current(Number(event.target.value));
						}}
					>
						<option value="1">1 · Performance</option>
						<option value="1.5">1.5 · Balanced</option>
						<option value="2">2 · Sharp</option>
					</select>
				</label>
				<p>
					Limited by your display’s pixel ratio. Allow a few seconds after switching for FPS to
					settle.
				</p>
				<button type="button" onClick={() => toggleBirdsRef.current()}>
					{birdsPaused ? 'Play birds' : 'Pause birds'}
				</button>
				<p>
					{birdsPaused
						? 'Animation paused'
						: `Animation: ${flight.fps.toFixed(0)} FPS · ${flight.frameMs.toFixed(1)} ms/frame`}
				</p>
				{metrics.loadMs > 0 && (
					<>
						<dl>
							{Object.entries(stages).map(([label, ms]) => (
								<div className={styles.timingRow} key={label}>
									<dt>{label}</dt>
									<dd>{ms.toFixed(0)} ms</dd>
								</div>
							))}
							<dt>Load through first render</dt>
							<dd>{metrics.loadMs.toFixed(0)} ms</dd>
							<dt>Draw calls · current frame</dt>
							<dd>{metrics.calls}</dd>
							<dt>Triangles drawn</dt>
							<dd>{metrics.triangles.toLocaleString()}</dd>
							<dt>CPU submission · live average</dt>
							<dd>{metrics.submitMs.toFixed(1)} ms</dd>
						</dl>
						<p>
							Local session timing, including cache effects. Animation FPS measures browser frame
							cadence, not isolated GPU time.
						</p>
					</>
				)}
			</details>
		</>
	);
}
