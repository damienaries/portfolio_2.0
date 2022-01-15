import React from 'react';
import styled from '@emotion/styled';
import JobCard from './JobCard';

export default function Jobs({ jobs }) {

    return (
        <JobContainer>
            {
                jobs && jobs.map(j => (
                    <JobCard job={j} key={j.title}/>
                ))
            }
        </JobContainer>
    )
}

const JobContainer = styled.section`
    width: 100%;
    margin: 2rem auto;
`

