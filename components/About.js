import React from 'react';
import styled from '@emotion/styled';
import sanityClient from '../client';
import ImageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

function urlFor(source) {
    return ImageUrlBuilder(sanityClient).image(source);
}

export default function About({ author }) {
    
    return author && (
        <StyledAbout id="about">
            <h2 className="section-title">About me</h2>
            <div className="flex-container">
                <div className="about-left">
                    <BlockContent 
                        className="bio-content"
                        blocks={author.bio}
                        imageOptions={{ w:320, h: 240, fit: 'max' }}
                        {...sanityClient.config()}
                    />
                </div>
                <div className="about-right">
                    { author.image && (
                        <div className="image-container">
                            <img 
                                className="my-pic"
                                alt="Sort of recent picture of me"
                                src={urlFor(author.image)
                                    .width(250)
                                .url()} />
                        </div>
                    )}
                </div>
            </div>    
        </StyledAbout>
    )
}

const StyledAbout = styled.section`
    width: 100%;
    padding: 2rem 4rem;

    .flex-container {
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin: 0 auto 2rem;
    }

    .section-title {
        font-size: 2.5rem;
        top: 1rem;
        text-align: center;
        margin-bottom: 4rem;
        font-weight: var(--weight-thin);
    }

    .about-left {
        height: 100%;
		flex: 2;
		margin: 0 auto;
		font-size: 1.6rem;
		letter-spacing: 1.5px;

		.bio-content {
			padding: 1rem;
            font-size: var(--size-body);
		}
    }

    .about-right {
        flex: 1;

        .image-container {
            text-align: center;
        }

        .my-pic {
            max-width: 15rem;
            border-radius: var(--radius);
        }
    }

    @media screen and (max-width: 800px) {
        margin-bottom: 3rem;

        .about-left {
            padding: 2rem;
        }
    }

    @media screen and (max-width: 600px) {
        .flex-container {
            flex-direction: column;
        }
    }
`