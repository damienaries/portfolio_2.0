import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import React from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';
import sanityClient from '../lib/client';
import CodeLinks from './CodeLinks';

/*
    TODO add more images per project in modal?
		fix tech icon part
		redesign layout
		multiple image slider?
*/		

export default function Project({ project }) {
	const { title, mainImage, technologies, body = [], liveLink, githubLink } = project;

	const imageProps = useNextSanityImage(sanityClient, mainImage);
	const { width } = useWindowDimensions(); // prob dont need this?
	const imageSize = width > 1000 || width < 600 ? '300' : '250';

	return (
		<StyledProject>
			<div className="project-container">
				<h3 className="title">{title}</h3>
				<div className="tech-pills">
						{technologies && technologies.map(t => (
								<div className="tech-pill" key={t}>{t}</div>
						))}
				</div>
				<div className="bottom-grid">
					<div className="left-container">
						{mainImage && (
							<Image 
								className="image"
								alt={title}
								layout="responsive"
								sizes="(max-width: 600px) 80vw, 300px"
								{...imageProps}
								priority="true"
							/>
						)}
						<CodeLinks githubLink={githubLink} liveLink={liveLink} />
					</div>
					
					<div className="description">
						<BlockContent blocks={body} />
					</div> 
				</div>
			</div>
		</StyledProject>
)
}

const StyledProject = styled.section`
width: 100%;
padding: 4rem;
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
	opacity: .5;
	bottom: 100%;
}

.project-container {
		width: 80%;
		padding: 2rem 4rem;
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
						padding: .5rem 1rem;
						margin: .5rem;
						font-size: 1.5rem;
						background-image: linear-gradient(
								to bottom right,
								var(--color-blue-light),
								var(--color-blue-light)
						);
						border-radius: 50px;
						backdrop-filter: blur(10px);
						-webkit-backdrop-filter: blur(10px);
				}
		

		.categories {
				position: absolute;
				top: 1rem;
				right: 1rem;
				display: flex;
				flex-direction: column;

				.categories-item {
						padding: .5rem;
						font-size: var(--size-body);
						padding: .25rem 1.25rem;
						margin: .25rem;
						border-radius: 50px;
						background-color: var(--color-blue-light);
				}
		}

		.bottom-grid {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-gap: 1rem;
				margin-top: 2rem;

				.image {
						border-radius: var(--radius);
				}
		
				.description {
						font-size: var(--size-body);
						padding: 0 1rem;
						text-align: left;
						line-height: 1.5;
				}
		}
}

@media screen and (max-width: 900px) {
		.project-container {
				width: 80%;
		}
}

@media screen and (max-width: 700px) {
		padding: 2rem;

		.project-container {
				width: 100%;
				padding: 2rem;

				.icon-back {
						font-size: 2.5rem;
						top: 1.5rem;
						left: 1rem;
				}

				.categories {
						flex-direction: row;
						top: 1rem;
						right: 1rem;
				}

				.title {
						margin-top: 3rem;
				}
		}
}

@media screen and (max-width: 600px) {
		.project-container {
				.bottom-grid {
						grid-template-columns: 1fr;
				}
		}
}
`