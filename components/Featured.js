import React from 'react';
import styled from '@emotion/styled';

// get from Sanity projects where featured is true, limit 4

export default function Featured() {
    return (
        <StyledFeatured>
            
        </StyledFeatured>
    )
}

const StyledFeatured = styled.ul`
    height: 200px;
    width: 100%;
    padding: 3rem;
    border: 2px solid yellow;
`