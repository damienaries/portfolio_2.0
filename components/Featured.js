import styled from '@emotion/styled';
import Project from '../components/Project';

export default function Featured({ projects }) {
    
    return (
        <StyledFeatured>
            <h1 className="section-title">
                Some Recent Work
            </h1>
            <section className="cards-container">
                {projects && projects.map(project => (
                    <Project project={project} />
                ))}
            </section>
        </StyledFeatured>
    )
}

const StyledFeatured = styled.ul`
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