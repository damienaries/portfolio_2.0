import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import sanityClient from '../../lib/client';
import groq from 'groq';
import Project from '../../components/Project';
import Job from '../../components/Job';

/***************** 
 TODO
    Add more projects!
    create jobs in sanity
    Work skills section design. Icons? hover effect? Sort? Separate skill into component
    Add Blurb about prev experience
*************************/
export default function Projects(props) {
    const { projects = [], technology = [] } = props;
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        let temp = [];
        technology.forEach(tech => temp.push(tech.title));
        setSkills(temp);
    }, [])


    return (
        <StyledProjects>
            <h1 className="section-title">
                Some Recent Projects
            </h1>
            <section className="projects-container">
                {
                    projects.map(project => (
                        <Project project={project} key={project._id} />
                    ))
                }
            </section>
            <h1 className="section-title">
                Skills & Techs & Tools i work with
            </h1>
            <div className="skills-container">
                {
                    skills && skills.map(skill => (
                        <span className="skill" key={skill._id}>
                            {skill}
                        </span>
                    ))
                }
            </div>
            <h1 className="section-title">
                Work Experience
            </h1>
            <section className="exp-container">
                {/* Loop over jobs / example Concept */}
                <Job />
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
    return {
      props: {
        projects,
        technology
      }
    }
  }

const StyledProjects = styled.div`
    width: 100%;
    text-align: center;
    padding: 4rem;

    .section-title {
        font-size: 2rem;
        font-weight: var(--weight-thin);
        text-transform: capitalize;
        margin: 5rem auto 1rem;
    }

    .projects-container,
    .skills-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        margin: 2rem auto;
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
        padding: 1rem;
    }

    @media screen and (max-width: 700px) {
        padding: 2rem;

    }

`
