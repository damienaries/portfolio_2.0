
import styled from '@emotion/styled';
import sanityClient from '../client';
import Link from 'next/link';
import groq from 'groq';

export default function Projects(props) {
    const { projects = [] } = props;

    console.log('projects', projects);

    return (
        <StyledProjects>
            <h1 className="page-title">
                Here is a selection of my favorite projects
            </h1>
            <section className="projects-container">
                {
                    projects.map(
                        ({ _id, title = '', slug = '', _updatedAt = ''}) => 
                        slug && 
                        <article key={_id} className="project-card">
                            <Link href="/projects/[slug]" as={`/projects/${slug.current}`}>
                                <a className="project-title">{title}</a>
                            </Link>
                            <p className="project-from">Created: {new Date(_updatedAt).toDateString()}</p>
                        </article>
                    )
                }
            </section>
        </StyledProjects>
    )
}

Projects.getInitialProps = async () => ({
    projects: await sanityClient.fetch(groq`
        *[_type == "project" && publishedAt < now()]|order(publishedAt asc)
    `)
})

const StyledProjects = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    text-align: center;
    padding: 4rem;

    .page-title {
        font-size: 2rem;
        font-weight: var(--weight-thin);
    }

    .projects-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        margin: 3rem auto;
        border: 1px solid yellow;

        .project-card {
            border: 1px solid orange;
            padding: 1rem;
            margin: 2rem;
        }
    }
`