import styled from '@emotion/styled';
import sanityClient from '../../lib/client';
import groq from 'groq';
import BlockContent from '@sanity/block-content-to-react';
import CodeLinks from '../../components/CodeLinks';
import {FaChevronLeft} from 'react-icons/fa';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import SkillsBanner from '../../components/SkillsBanner';


/*************************
 TODO:  REFACTOR && SPLIT
 *************************/

const Project = ({project}) => {
    const { 
        title = 'Missing Title', 
        categories,
        mainImage,
        technologies,
        body = [],
        githubLink,
        liveLink
    } = project;
    const router = useRouter();
    const imageProps = useNextSanityImage(
        sanityClient, mainImage
    )

    return (
        <StyledProject>
            <div className="project-container">
                <FaChevronLeft className="icon-back" onClick={() => router.back()}/>
                <h3 className="title">{title}</h3>
                {categories && (
                    <ul className="categories">
                        {categories.map(category => (
                            <li className="categories-item" key={category}>
                                {category}
                            </li>
                        ))}
                    </ul>
                )}
                {technologies && (
                    <SkillsBanner skills={technologies} />
                )}
                <div className="bottom-grid">
                    <div className="left-container">
                        {mainImage && (
                            <Image 
                                className="image"
                                alt={title}
                                layout="responsive"
                                sizes="(max-width: 600px) 80vw, 300px"
                                {...imageProps}
                            />
                        )}
                    <CodeLinks 
                        githubLink={githubLink} 
                        liveLink={liveLink}
                    />
                    </div>
                    
                    <div className="description">
                        <BlockContent blocks={body} />
                    </div> 
                </div>
            </div>
        </StyledProject>
    )
}

const query = groq`*[_type == "project" && slug.current == $slug][0]{
    title, 
    "categories": categories[]->title,
    mainImage,
    "technologies": technologies[]->title,
    body,
    githubLink,
    liveLink,
}`

// preload all projects and grab slug
export async function getStaticPaths() {
    const projects = await sanityClient.fetch(groq`
        *[_type == "project"]
    `)

    const paths = projects.map(project => ({
        params: { slug: project.slug.current }
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    // default the slug so it does not return undefined
    const slug  = params.slug;
    const project = await sanityClient.fetch(query, { slug });

    return {
        props: {
            project
        }
    }
}

const StyledProject = styled.section`
    width: 100%;
    padding: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .project-container {
        width: 65%;
        padding: 2rem 4rem;
        text-align: center;
        border-radius: var(--radius);
        background-image: linear-gradient(
            to bottom right,
            var(--color-blue-light),
            var(--color-blue-light)
        );
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        position: relative;

        .title {
            font-size: var(--size-title-section);
            font-weight: var(--weight-thin);
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--color-white);
        }

        .icon-back {
            position: absolute;
            top: 2rem;
            left: 2rem;
            font-size: 3rem;
            padding: .5rem;
            transition: all .2s ease-out;

            &:hover,
            &:active {
                filter: drop-shadow(0 0.25rem .5rem var(--color-white));
                cursor: pointer;
            }
        }

        .categories {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            display: flex;
            flex-direction: column;

            .categories-item {
                padding: .5rem;
                font-size: var(--size-body);
                padding: .5rem 1.5rem;
                margin: .5rem;
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

export default Project;
