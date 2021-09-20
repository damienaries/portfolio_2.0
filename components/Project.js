import React from 'react';
import styled from '@emotion/styled';
import ImageUrlBuilder from '@sanity/image-url';
import sanityClient from '../client';
import Link from 'next/link';

function urlFor(source) {
    return ImageUrlBuilder(sanityClient).image(source);
}

export default function Project({ project }) {
    console.log(project);

    return (
        <StyledProject>
            <Link href={`/projects/${project.slug.current}`}>
                <article key={project.title}>
                    <h4 className="project-title">{project.title}</h4>
                    {project.mainImage && (
                        <img 
                            className="project-img"
                            src={urlFor(project.mainImage)
                                .height(250)
                                .width(250)
                                .url()} />
                    )} 
                <div className="links">
                    <Link href="/">See Repo</Link>
                    <button className="code-link"></button>
                    <button className="code-link"></button>
                </div>
                </article>
            </Link>
        </StyledProject>
    )
}

const StyledProject = styled.article`
    margin: 2rem;
    border-radius: 10px;
    padding: 3rem 5rem 4rem;
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