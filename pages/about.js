import styled from '@emotion/styled';

export default function About() {
    return (
        <StyledAbout>
            <h3>About page</h3>
        </StyledAbout>
    )
}

const StyledAbout = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    background-color: orange;
`