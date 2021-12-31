import React from 'react';
import styled from '@emotion/styled';
import JobCard from './JobCard';

export default function Jobs({ jobs }) {

    return (
        <JobContainer>
            {
                jobs && jobs.map(j => (
                    <JobCard job={j} />
                ))
            }
           {/* Hardcoding bartending exp for now */}
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
        </JobContainer>
    )
}

const JobContainer = styled.section`
    border: 2px dotted yellow;
    width: 100%;
    margin: 2rem auto;
`

