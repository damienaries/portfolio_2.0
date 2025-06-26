import styled from '@emotion/styled';
import Image from 'next/legacy/image';
import React from 'react';
import CodeLinks from './CodeLinks';
import TechPill from './TechPill';

export default function Project({ project }) {
	const { title, mainImage, technologies, body, liveLink, githubLink } =
		project;

	return (
		<StyledProject>
			<div className="project-container">
				<div className="header">
					<h3 className="title">{title}</h3>
					<div className="tech-pills">
						{technologies &&
							technologies.map((tech) => (
								<TechPill key={tech} technology={tech} />
							))}
					</div>
				</div>
				<div className="content">
					<div className="left-column">
						<div className="image-container">
							{mainImage && (
								<Image
									className="image"
									src={mainImage.src}
									alt={mainImage.alt}
									layout="responsive"
									sizes="(max-width: 600px) 80vw, 500px"
									width={600}
									height={400}
									priority="true"
								/>
							)}
						</div>
						<CodeLinks githubLink={githubLink} liveLink={liveLink} />
					</div>

					<p className="description">{body}</p>
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
		padding: 2rem;
		text-align: center;
		border-radius: var(--radius);
		background-color: ${(props) => props.theme.cardBackground};
		box-shadow: ${(props) => props.theme.boxShadow};

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 2rem;
			padding-bottom: 2rem;
			border-bottom: 1px solid ${(props) => props.theme.borderColor};

			.title {
				font-weight: var(--weight-thin);
				margin: 0;
				text-align: left;
			}

			.tech-pills {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				gap: 0.5rem;
				justify-content: flex-end;
			}
		}

		.content {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
			align-items: start;
			padding: 0 1rem;

			.left-column {
				display: flex;
				flex-direction: column;
				gap: 1.5rem;
			}

			.image-container {
				position: relative;
				border-radius: var(--radius);
				overflow: hidden;
				box-shadow: ${(props) => props.theme.boxShadow};

				.image {
					border-radius: var(--radius);
					transition: transform 0.3s ease;

					&:hover {
						transform: scale(1.02);
					}
				}
			}

			.description {
				text-align: left;
				padding: 1rem;
				background-color: ${(props) => props.theme.background};
				border-radius: var(--radius);
				box-shadow: ${(props) => props.theme.boxShadow};
			}
		}
	}

	@media screen and (max-width: 900px) {
		.project-container {
			width: 90%;

			.content {
				grid-template-columns: 1fr;
				gap: 2rem;
			}
		}
	}

	@media screen and (max-width: 768px) {
		padding: 2rem 0 3rem;

		&::before {
			width: 80%;
		}

		.project-container {
			width: 100%;
			padding: 1.5rem 1.5rem 2.5rem;

			.header {
				flex-direction: column;
				align-items: flex-start;
				gap: 1rem;
				margin-bottom: 2.5rem;

				.title {
					width: 100%;
					text-align: center;
				}

				.tech-pills {
					width: 100%;
					justify-content: center;
				}
			}
		}
	}
`;
