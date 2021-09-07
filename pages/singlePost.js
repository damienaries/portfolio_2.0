import styled from '@emotion/styled';

export default function SinglePost() {
    return (
        <StyledSinglePost>
            <h3>Single Post page</h3>
        </StyledSinglePost>
    )
}

const StyledSinglePost = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    background-color: greenyellow;
`