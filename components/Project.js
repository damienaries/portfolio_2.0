import React from 'react';
import styled from '@emotion/styled';
import ImageUrlBuilder from '@sanity/image-url';
import sanityClient from '../lib/client';
import Link from 'next/link';
import CodeLinks from './CodeLinks';
import useWindowDimensions from '../hooks/useWindowDimensions';

function urlFor(source) {
    return ImageUrlBuilder(sanityClient).image(source);
}

export default function Project({ project }) {
    const { slug, title, mainImage, liveLink, githubLink } = project;
    const { width } = useWindowDimensions();

    return (
        <StyledProject>
            <Link href={`/projects/${slug.current}`}>
                <article key={title}>
                    <h4 className="project-title">{title}</h4>
                    {mainImage && (
                        <img 
                            className="project-img"
                            alt={title}
                            src={urlFor(mainImage)
                                .height(width > 900 || width < 700 ? 250 : 200)
                                .width(width > 900 || width < 700 ? 250 : 200)
                                .url()} />
                    )} 
                </article>
            </Link>
            <CodeLinks githubLink={githubLink} liveLink={liveLink} />
        </StyledProject>
    )
}

const StyledProject = styled.article`
    margin: 2rem;
    border-radius: 10px;
    padding: 3rem 5rem 1rem;
    transition: all .2s ease-out;
    
        &:hover {
            background-color: var(--color-blue-light);
            cursor: pointer;
        }

        .project-img {
            border-radius: var(--radius);
        }

        .project-title {
            font-size: 2rem;
            letter-spacing: 1px;
            margin-bottom: 2rem;
        }

        @media screen and (max-width: 900px) {
            margin: 1rem;
            padding: 2rem 3rem 1rem;
        }
`