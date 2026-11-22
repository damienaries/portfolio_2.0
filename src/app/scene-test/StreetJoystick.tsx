'use client';

import { useRef, useState } from 'react';
import styles from './scene-test.module.css';

type Props = { onChange: (turn: number, walk: number) => void };

/** Pointer capture keeps a thumb drag active even outside the pad. */
export default function StreetJoystick({ onChange }: Props) {
	const pointer = useRef<number | null>(null);
	const [thumb, setThumb] = useState({ x: 0, y: 0 });
	const release = () => {
		pointer.current = null;
		setThumb({ x: 0, y: 0 });
		onChange(0, 0);
	};
	const move = (event: React.PointerEvent<HTMLDivElement>) => {
		if (pointer.current !== event.pointerId) return;
		const bounds = event.currentTarget.getBoundingClientRect();
		const radius = bounds.width * 0.3;
		let x = (event.clientX - bounds.left - bounds.width / 2) / radius;
		let y = (event.clientY - bounds.top - bounds.height / 2) / radius;
		const magnitude = Math.max(1, Math.hypot(x, y));
		x /= magnitude;
		y /= magnitude;
		setThumb({ x: x * radius, y: y * radius });
		const deadZone = (value: number) =>
			Math.abs(value) < 0.15 ? 0 : (Math.sign(value) * (Math.abs(value) - 0.15)) / 0.85;
		onChange(-deadZone(x), -deadZone(y));
	};

	return (
		<div
			className={styles.joystick}
			role="group"
			aria-label="Street joystick: drag up or down to walk, left or right to look"
			onContextMenu={(event) => event.preventDefault()}
			onPointerDown={(event) => {
				if (pointer.current !== null) return;
				pointer.current = event.pointerId;
				event.currentTarget.setPointerCapture(event.pointerId);
				move(event);
			}}
			onPointerMove={move}
			onPointerUp={release}
			onPointerCancel={release}
			onLostPointerCapture={release}
		>
			<span className={styles.joystickArrows} aria-hidden="true">
				↑<br />
				←　→
				<br />↓
			</span>
			<span
				className={styles.joystickThumb}
				style={{ transform: `translate(${thumb.x}px, ${thumb.y}px)` }}
			/>
		</div>
	);
}
