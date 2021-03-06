import styled from '@emotion/styled';
import Project from '../components/Project';

export default function Featured({ projects }) {
    
    return (
        <StyledFeatured>
            <h3 className="section-title">
                Recent Work
            </h3>
            <section className="cards-container">
                {projects && projects.map(project => (
                    <Project project={project} key={project._id}/>
                ))}
            </section>
        </StyledFeatured>
    )
}

const StyledFeatured = styled.div`
    width: 100%;
    padding: 1rem 3rem;
    text-align: center;
    margin: 2rem auto 10rem;

    .section-title {
        font-size: var(--size-title-section);
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

    @media screen and (max-width: 600px) {
        padding: 3rem 1rem;
    }
`