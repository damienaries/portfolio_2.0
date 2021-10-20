import React from 'react';
import styled from '@emotion/styled';

export default function Job() {
    return (
        <>
            <JobCard>
                <div className="info">
                    <h4 className="job">
                        Full Stack Intern - CONCEPT.app
                    </h4>
                    <span className="dates">Jan 2021 - July 2021</span>
                </div>
                
                <p className="description">
                    Concept is a social platform for human flourishing
                    built in JavaScript, React and Firebase. My role there
                    as a member of the startup’s founding dev team was
                    distributed across the stack, with a Front-End focus to
                    build foundational features like a forum page and our
                    onboarding slides.
                </p>
            </JobCard>
            <JobCard>
                <div className="info">
                    <h4 className="job">
                        Bartender - Bar Manager
                    </h4>
                    <span className="dates">From 2005 to 2020</span>
                </div>
                
                <p className="description">
                    Before I made the decision to return to a previous career plan and learned to code, I enjoyed a long international career tending and running cocktail bars in Paris, NYC, Montreal, St Barts - and many other places. Those were good years that led me where I am today and I&apos;m always happy to talk about them.<br/>
                    As a developer, I bring along the solid work ethic and invaluable skills acquired through all these years of customer facing & team leading roles.
                </p>
            </JobCard>
        </>
    )
}

const JobCard = styled.article`
    width: 80%;
    margin: 2rem auto;
    padding: 2rem 3rem;
    background-image: linear-gradient(
            to bottom right,
            var(--color-blue-light),
            var(--color-blue-light)
        );
    border-radius: var(--radius);

    .info {
        display: flex;
        justify-content: space-between;
        font-size: var(--size-subtitle);
        padding-bottom: 1rem;
        letter-spacing: 1px;
    }

    .description {
        text-align: left;
        font-size: var(--size-body);
    }

    @media screen and (max-width: 900px) {
        width: 90%;

        .info {
            flex-direction: column;
            align-items: flex-start;
            

            .job {
                margin-bottom: .5rem;
                text-align: left;
            }
        }
    }
`