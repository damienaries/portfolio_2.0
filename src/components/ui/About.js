import styled from '@emotion/styled';
import { MdClose } from 'react-icons/md';

export default function About({ close }) {
	return (
		<StyledAbout>
			<div className="about-content">
				<button className="close-button" onClick={close}>
					<MdClose />
				</button>
				<h2>About Me</h2>
				<p>
					I'm a full-stack developer with a passion for creating beautiful and
					functional web applications. I specialize in JavaScript/TypeScript,
					React, Node.js, and modern web technologies.
				</p>
				<p>
					With a background in both frontend and backend development, I enjoy
					building complete solutions that provide great user experiences while
					maintaining clean and maintainable code.
				</p>
			</div>
		</StyledAbout>
	);
}

const StyledAbout = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;

	.about-content {
		background: var(--color-background);
		padding: 2rem;
		border-radius: 8px;
		max-width: 600px;
		width: 90%;
		position: relative;

		h2 {
			font-size: var(--size-title-section);
			margin-bottom: 1rem;
		}

		p {
			font-size: var(--size-text);
			line-height: 1.6;
			margin-bottom: 1rem;
		}
	}

	.close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		color: var(--color-text);
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0.5rem;

		&:hover {
			opacity: 0.7;
		}
	}
`;
