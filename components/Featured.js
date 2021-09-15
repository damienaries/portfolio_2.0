import Link from 'next/link';
import styled from '@emotion/styled';
import ImageUrlBuilder from '@sanity/image-url';
import sanitySlient from '../client';

// show tech stack, link to live project and repo

function urlFor(source) {
    return ImageUrlBuilder(sanitySlient).image(source);
}

export default function Featured({ projects }) {
    
    return (
        <StyledFeatured>
            <h1 className="section-title">
                Here is a selection of my favorite projects
            </h1>
            <section className="cards-container">
                {projects.map(project => project.slug && (
                    <Link href={`/projects/${project.slug.current}`}>
                        <article className="project-card" key={project.title}>
                            <h4 className="project-card-title">{project.title}</h4>
                            {project.mainImage && (
                                <img 
                                    className="project-card-img"
                                    src={urlFor(project.mainImage)
                                        .height(250)
                                        .width(250)
                                        .url()} />
                            )}  
                        </article>
                    </Link>
                ))}
            </section>
        </StyledFeatured>
    )
}

const StyledFeatured = styled.ul`
    width: 100%;
    padding: 3rem;
    text-align: center;

    .section-title {
        font-size: 2.5rem;
        top: 1rem;
        text-align: center;
        margin-bottom: 4rem;
        font-weight: var(--weight-thin);
    }

    .cards-container {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;

        .project-card {
            margin: 2rem;
            border-radius: 10px;
            padding: 3rem 5rem 4rem;
            transition: all .2s ease-out;
            
            &:hover {
                background-color: var(--color-blue-light);
                cursor: pointer;
            }

            &-img {
                border-radius: var(--radius);
            }

            &-title {
                font-size: 2rem;
                letter-spacing: 1px;
                margin-bottom: 2rem;
            }
        }
    }
`