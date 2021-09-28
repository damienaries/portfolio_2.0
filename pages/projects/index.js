import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import sanityClient from '../../lib/client';
import groq from 'groq';
import Project from '../../components/Project';
import Job from '../../components/Job';
import SkillsBanner from '../../components/SkillsBanner';

/***************** 
 TODO
    Add more projects!
    create jobs in sanity
*************************/
export default function Projects(props) {
    const { projects = [], technology = [] } = props;

    return (
        <StyledProjects>
            <h3 className="section-title">
                Recent Projects
            </h3>
            <section className="projects-container">
                {
                    projects.map(project => (
                        <Project project={project} key={project._id} />
                    ))
                }
            </section>
            <h3 className="section-title">
                Skills & Techs
            </h3>
            {
                technology && 
                    <SkillsBanner skills={technology} />
            }
            <h3 className="section-title">
                Work Experience
            </h3>
            <section className="exp-container">
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
    padding: 2rem;

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
        margin: 2rem auto;
        line-height: 2;
    }

    .exp-container {
        padding: 1rem;
    }

    @media screen and (max-width: 700px) {
        padding: 1rem;
    }

`
