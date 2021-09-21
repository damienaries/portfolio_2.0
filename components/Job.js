import React from 'react';
import styled from '@emotion/styled';

export default function Job() {
    return (
        <JobCard>
            <div className="info">
                <h3 className="job">
                    Full Stack Developer - Intern -  CONCEPT.app
                </h3>
                <span className="dates">Jan 2021 - July 2021</span>
            </div>
            
            <p className="description">{/*TODO REWRITE DESCRIPTION */}
                Concept is a social platform for human flourishing
                built in JavaScript, React and Firebase. My role there
                as a member of the startup’s founding dev team was
                distributed across the stack, with a Front-End focus to
                build foundational features like a forum page and our
                onboarding slides.
            </p>
        </JobCard>
    )
}

const JobCard = styled.article`
    width: 60%;
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
        font-size: 1.4rem;
        padding-bottom: 1rem;
    }

    .description {
        text-align: left;
        font-size: var(--size-body);
    }
`