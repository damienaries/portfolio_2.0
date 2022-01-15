import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import sanityClient from '../../lib/client';
import groq from 'groq';
import Project from '../../components/Project';
import Jobs from '../../components/Jobs';
import SkillsBanner from '../../components/SkillsBanner';

export default function Projects(props) {
    const { projects = [], technology = [], jobs = [] } = props;
    const [skills, setSkills] = useState([]);

    // Grab & save in state icon slug
    useEffect(() => {
        let temp = [];
        technology.map(tech => temp.push(tech.icon));
        setSkills(temp);
    }, [])

    return (
        <StyledProjects>
            <h3 className="section-title">
                Recent Projects
            </h3>
            <section className="projects-container">
                {
                    projects && 
                        projects.map(project => (
                            <Project project={project} key={project._id} />
                        ))
                }
            </section>
            <h3 className="section-title">
                Skills & Techs I love to work with
            </h3>
            {
                technology && 
                    <SkillsBanner skills={skills} />
            }
            <h3 className="section-title">
                Work Experience
            </h3>
            <section className="exp-container">
                <Jobs jobs={jobs} />
            </section>
        </StyledProjects>
    )
}

export async function getStaticProps() {
    const projects = await sanityClient.fetch(groq`
        *[_type == "project" && featured != true]
      `)
    const technology = await sanityClient.fetch(groq`
        *[_type == "technology"]
      `)
    const jobs = await sanityClient.fetch(groq`
        *[_type == "job"] | order(from desc)
    `)

    return {
      props: {
        projects,
        technology,
        jobs
      }
    }
  }

const StyledProjects = styled.div`
    width: 100%;
    text-align: center;

    .section-title {
        font-size: var(--size-title-section);
        font-weight: var(--weight-thin);
        text-transform: capitalize;
        margin: 5rem auto 1rem;
    }

    .projects-container { 
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        margin: 2rem auto 10rem;
        line-height: 2;
    }

    .exp-container {
        padding: 1rem;
        margin: 2rem auto 10rem;
    }

    @media only screen and (max-width: 600px) {
        .section-title {
            font-size: calc(var(--size-body) + .75rem);
        }
    }
`
