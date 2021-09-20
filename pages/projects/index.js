import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import sanityClient from '../../client';
import Link from 'next/link';
import groq from 'groq';
import Project from '../../components/Project';

export default function Projects(props) {
    const { projects = [], technology = [] } = props;
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        let temp = [];
        technology.forEach(tech => temp.push(tech.title))
        setSkills(temp);
    }, [])

    return (
        <StyledProjects>
            <h1 className="section-title">Skills & Stack</h1>
            <div className="skills-container">
                {skills && skills.map(skill => (
                    <span className="skill">{skill}</span>
                ))}
            </div>
            <h1 className="section-title">
                Projects
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
        *[_type == "project"]
    `),
    technology: await sanityClient.fetch(groq`
            *[_type == "technology"]
    `)
})

const StyledProjects = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    text-align: center;
    padding: 4rem;

    .section-title {
        font-size: 2rem;
        font-weight: var(--weight-thin);
    }

    .projects-container,
    .skills-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 90%;
        margin: 3rem auto;
        border: 1px solid yellow;
        line-height: 2;

        .project-card {
            border: 1px solid orange;
            padding: 1rem;
            margin: 2rem;
        }

        .skill {
            font-size: 1.5rem;
            padding: .5rem 1rem;
            background-color: var(--color-blue-light);
            margin: 1rem;
            border-radius: var(--radius);
        }
    }
`