import styled from '@emotion/styled';
import sanityClient from '../../lib/client';
import groq from 'groq';
import ImageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import CodeLinks from '../../components/CodeLinks';
import {FaChevronLeft} from 'react-icons/fa';
import { useRouter } from 'next/router';

function urlFor(source) {
    return ImageUrlBuilder(sanityClient).image(source);
}

const Project = (props) => {
    const { 
        title = 'Missing Title', 
        categories,
        mainImage,
        technologies,
        body = [],
        githubLink,
        liveLink
    } = props;
    const router = useRouter();

    return (
        <StyledProject>
            <div className="project-container">
                <FaChevronLeft className="icon-back" onClick={() => router.back()}/>
                <h1 className="title">{title}</h1>
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
                    <ul className="technologies">
                        {technologies.map(tech => (
                            <div className="tech" key={tech}>{tech}</div>
                        ))}
                    </ul>
                )}
                <div className="bottom-grid">
                    <div className="left-container">
                        {mainImage && (
                            <img 
                                className="image"
                                src={urlFor(mainImage)
                                    .url()}
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

Project.getInitialProps = async function(context) {
    // default the slug so it does not return undefined
    const { slug = "" } = context.query;
    return await sanityClient.fetch(query, { slug });
}

const StyledProject = styled.section`
    width: 100%;
    padding: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .project-container {
        width: 65%;
        padding: 4rem;
        text-align: center;
        border-radius: var(--radius);
        background-image: linear-gradient(
            to bottom right,
            var(--color-blue-light),
            var(--color-blue-light)
        );
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(5px);
        position: relative;

        .title {
            font-size: 2rem;
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
            border-radius: 50%;
            padding: .5rem;
            transition: all .2s ease-out;

            &:active {
                box-shadow: var(--shadow-light);
                cursor: pointer;
            }
        }

        .categories {
            position: absolute;
            top: 2rem;
            right: 2rem;

            .categories-item {
                padding: .5rem;
                font-size: 1rem;
                padding: .5rem 1.5rem;
                margin: .5rem;
                border-radius: 50px;
                background-color: var(--color-blue-light);
            }
        }

        .technologies {
            display: flex;
            justify-content: space-evenly;
            padding: 1rem;
            font-size: 1.5rem;
            flex-wrap: wrap;
            height: auto;

            .tech {
                font-size: 1.3rem;
                padding: .5rem 1.5rem;
                background-color: var(--color-blue-light);
                margin: 1rem;
                border-radius: var(--radius);
            }
        }

        .bottom-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 1rem;
            margin-top: 2rem;

            .image {
                width: 100%;
                height: auto;
                border-radius: var(--radius);
            }
        
            .description {
                font-size: 1.3rem;
                padding: 0 2rem;
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

    @media screen and (max-width: 768px) {
        .project-container {
            width: 90%;
        }
    }

    @media screen and (max-width: 600px) {
        .bottom-grid {
            flex-direction: column;
        }

        .categories {
            display: none;
        }

    }
`

export default Project;
