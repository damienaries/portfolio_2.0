import styled from '@emotion/styled';
import { PortableText } from '@portabletext/react';
import Image from 'next/legacy/image';
import React from 'react';
import CodeLinks from './CodeLinks';

export default function Project({ project }) {
	const {
		title,
		mainImage,
		technologies,
		body = [],
		liveLink,
		githubLink,
	} = project;

	return (
		<StyledProject>
			<div className="project-container">
				<h3 className="title">{title}</h3>
				<div className="tech-pills">
					{technologies &&
						technologies.map((t, i) => (
							<div className="tech-pill" key={t}>
								{t}
							</div>
						))}
				</div>
				<div className="bottom-grid">
					<div>
						{mainImage && (
							<Image
								className="image"
								src={mainImage.src}
								alt={title}
								layout="responsive"
								sizes="(max-width: 600px) 80vw, 500px"
								width={600}
								height={400}
								priority="true"
							/>
						)}
						<CodeLinks githubLink={githubLink} liveLink={liveLink} />
					</div>

					<div className="description">
						<PortableText value={body} />
					</div>
				</div>
			</div>
		</StyledProject>
	);
}

const StyledProject = styled.section`
	width: 100%;
	padding: 4rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	&::before {
		position: absolute;
		content: '';
		background-color: ${(props) => props.theme.borderColor};
		width: 40%;
		height: 1px;
		opacity: 0.5;
		bottom: 100%;
	}

	.project-container {
		width: 80%;
		padding: 2rem 0;
		text-align: center;
		border-radius: var(--radius);
		background-color: ${(props) => props.theme.cardBackground};
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);

		.title {
			font-size: var(--size-title-section);
			font-weight: var(--weight-thin);
			margin-bottom: 2rem;
			padding-bottom: 2rem;
			border-bottom: 1px solid ${(props) => props.theme.borderColor};
		}

		.tech-pills {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			flex-wrap: wrap;
		}
		.tech-pill {
			padding: 0.5rem 1rem;
			margin: 0.5rem;
			font-size: 1.3rem;
			background-image: linear-gradient(
				to bottom right,
				var(--color-blue-light),
				var(--color-blue-light)
			);
			border-radius: 50px;
			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
		}

		.bottom-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 1rem;
			padding: 2.5rem;

			.image {
				border-radius: var(--radius);
			}

			.description {
				font-size: var(--size-body);
				padding: 0 1rem;
				text-align: left;
			}
		}
	}

	@media screen and (max-width: 900px) {
		.project-container {
			width: 90%;

			.bottom-grid {
				grid-template-columns: 1fr;
			}
		}
	}

	@media screen and (max-width: 768px) {
		padding: 2rem 0;

		::before {
			width: 80%;
		}

		.project-container {
			width: 100%;
			padding: 2rem;
		}
	}
`;
