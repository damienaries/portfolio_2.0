import styled from '@emotion/styled';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';
import sanityClient from '../lib/client';
import CodeLinks from './CodeLinks';

/*
    TODO make project page into modal test
*/

export default function Project({ project }) {
	const { slug, title, mainImage, liveLink, githubLink } = project;

	const imageProps = useNextSanityImage(sanityClient, mainImage);
	const { width } = useWindowDimensions();
	const imageSize = width > 1000 || width < 600 ? '300' : '250';

	return (
		project && (
			<StyledProject>
				<Link href={`/projects/${slug.current}`}>
					<article key={title} className="project">
						<h4 className="project-title">{title}</h4>
						{mainImage && (
							<Image
								className="project-img"
								alt={title}
								src={imageProps.src}
								layout="intrinsic"
								height={imageSize}
								width={imageSize}
								objectFit="cover"
								priority="true"
							/>
						)}
					</article>
				</Link>
				<CodeLinks githubLink={githubLink} liveLink={liveLink} />
			</StyledProject>
		)
	);
}

const StyledProject = styled.article`
	margin: 2rem;
	border-radius: 10px;
	padding: 1rem 3rem;
	transition: all 0.2s ease-out;

	&:hover {
		background-color: ${(props) => props.theme.cardBackground};
		cursor: pointer;
	}

	.project-img {
		border-radius: var(--radius);
	}

	.project-title {
		font-size: var(--size-subtitle);
		letter-spacing: 1px;
		padding: 1rem;
	}

	@media screen and (max-width: 900px) {
		margin: 1rem;
		padding: 2rem 3rem 1rem;
	}
`;
