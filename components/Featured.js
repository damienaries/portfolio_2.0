import styled from '@emotion/styled';
import Project from '../components/Project';
import sanityClient from '../lib/client';
import groq from 'groq';

export default function Featured({ projects }) {
    console.log('from featured:', projects);
    
    return (
        <StyledFeatured>
            <h1 className="section-title">
                Some Recent Work
            </h1>
            <section className="cards-container">
                {projects && projects.map(project => (
                    <Project project={project} key={project._id}/>
                ))}
            </section>
        </StyledFeatured>
    )
}

export async function getStaticProps() {
    const projects = await sanityClient.fetch(groq`
        *[_type == "project"]
    `);
    
    return {
        projects
    } 
}

const StyledFeatured = styled.div`
    width: 100%;
    padding: 3rem;
    text-align: center;
    margin-bottom: 5rem;

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
    }
`