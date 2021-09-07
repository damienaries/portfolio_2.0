import styled from '@emotion/styled';

export default function Blog() {
    return (
        <StyledBlog>
            <h3>Blog page</h3>
        </StyledBlog>
    )
}

const StyledBlog = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    background-color: purple;
`