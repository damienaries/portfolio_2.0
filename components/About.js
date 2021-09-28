import React from 'react';
import styled from '@emotion/styled';
import sanityClient from '../lib/client';
import ImageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import Image from 'next/image';

function urlFor(source) {
    return ImageUrlBuilder(sanityClient).image(source);
}

export default function About({ author }) {
    
    return (
        <StyledAbout id="about">
            <div className="flex-container">
                <div className="about-left">
                    <BlockContent 
                        className="bio-content"
                        blocks={author?.bio}
                        imageOptions={{ w:320, h: 240, fit: 'max' }}
                        {...sanityClient.config()}
                    />
                </div>
                <div className="about-right">
                    { author?.image && (
                        <div className="image-container">
                            <Image 
                                className="my-pic"
                                alt="Sort of recent picture of me"
                                layout="intrinsic"
                                width={200}
                                height={200}
                                src={urlFor(author?.image)
                                    .url()}
                                />
                        </div>
                    )}
                </div>
            </div>    
        </StyledAbout>
    )
}

const StyledAbout = styled.section`
    width: 100%;

    .flex-container {
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin: 0 auto 2rem;
    }

    .section-title {
        font-size: var(--size-title-section);
        top: 1rem;
        text-align: center;
        margin-bottom: 4rem;
        font-weight: var(--weight-thin);
    }

    .about-left {
		flex: 2;

		.bio-content {
            font-size: var(--size-body);
            letter-spacing: 1.5px;
            margin-right: 2rem;
		}
    }

    .about-right {
        flex: 1;

        .image-container {
            text-align: center;
        }

        .my-pic {
            max-width: 10rem;
            border-radius: var(--radius);
        }
    }

    @media screen and (max-width: 800px) {
        margin-bottom: 3rem;

        .about-left {
            padding: 0 2rem 2rem;
        }
    }

    @media screen and (max-width: 600px) {
        .flex-container {
            flex-direction: column;
        }

        .about-left {
            .bio-content {
                margin-bottom: 2rem;
            }
        }
    }
`