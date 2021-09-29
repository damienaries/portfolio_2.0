import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import sanityClient from '../lib/client';
import Link from 'next/link';
import CodeLinks from './CodeLinks';
import { useNextSanityImage } from 'next-sanity-image';
import useWindowDimensions from '../hooks/useWindowDimensions';

export default function Project({ project }) {
    const { slug, title, mainImage, liveLink, githubLink } = project;
    const imageProps = useNextSanityImage(
        sanityClient, mainImage
    )
    const {width} = useWindowDimensions();
    const imageSize = width > 1000 || width < 600 ? '350' : '250'

    return (
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
                        />
                        
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
            font-size: var(--size-subtitle);
            letter-spacing: 1px;
            padding: 1rem;
        }

        @media screen and (max-width: 900px) {
            margin: 1rem;
            padding: 2rem 3rem 1rem;
        }
`