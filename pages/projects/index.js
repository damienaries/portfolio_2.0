import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import sanityClient from '../../client';
import groq from 'groq';
import Project from '../../components/Project';

export default function Projects(props) {
    const { projects = [], technology = [] } = props;
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        let temp = [];
        technology.forEach(tech => temp.push(tech.title));
        setSkills(temp);
    }, [])

    // filter non featured projects since they show on home page
    const otherProjects = projects.filter(p => {
        return p.featured === false;
    })

    return (
        <StyledProjects>
            <h1 className="section-title">My Quiver</h1>
            <div className="skills-container">
                {skills && skills.map(skill => (
                    <span className="skill">{skill}</span>
                ))}
            </div>
            <h1 className="section-title">
                My Projects
            </h1>
            <section className="projects-container">
            {
                otherProjects.map(project => (
                    <Project project={project} key={project._id} />
                ))
            }
            </section>
            <h1 className="section-title">
                My Experience
            </h1>
            <section className="exp-container">
                <p className="exp">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla iusto aspernatur cum sint eum nisi explicabo, molestiae assumenda illo cumque debitis doloribus culpa minima eveniet aut in consequatur possimus quas, laboriosam quia obcaecati sapiente! Aliquam voluptatem incidunt deleniti itaque.</p>
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
        width: 100%;
        margin: 3rem auto 5rem;
        line-height: 2;

        .skill {
            font-size: 1.5rem;
            padding: .5rem 1rem;
            background-color: var(--color-blue-light);
            margin: 1rem;
            border-radius: var(--radius);
        }
    }

    .exp-container {
        border: 1px solid yellow;
    }
`
