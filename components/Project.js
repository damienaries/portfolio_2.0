import React from 'react';
import styled from '@emotion/styled';
import ImageUrlBuilder from '@sanity/image-url';
import sanityClient from '../client';
import Link from 'next/link';
import CodeLinks from './CodeLinks';

function urlFor(source) {
    return ImageUrlBuilder(sanityClient).image(source);
}

export default function Project({ project }) {
    const { slug, title, mainImage, liveLink, githubLink } = project;

    return (
        <StyledProject>
            <Link href={`/projects/${slug.current}`}>
                <article key={title}>
                    <h4 className="project-title">{title}</h4>
                    {mainImage && (
                        <img 
                            className="project-img"
                            src={urlFor(mainImage)
                                .height(250)
                                .width(250)
                                .url()} />
                    )} 
                </article>
            </Link>
            {/*<div className="links">
                {githubLink !== undefined && (
                    <Link href={`${githubLink}`}>
                        <a className="code-link" target="_blank">See Repo</a>
                    </Link>
                )}
                {liveLink !== undefined && (
                    <Link href={`${liveLink}`}>
                    <a className="code-link" target="_blank">Visit Site</a>
                </Link>
                )}
                </div>*/}
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
`