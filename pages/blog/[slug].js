import styled from '@emotion/styled';
import client from '../../lib/client';
import groq from 'groq';
import ImageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

function urlFor(source) {
    return ImageUrlBuilder(client).image(source);
}

const Post = (props) => {
    const { 
        title = 'Missing Title', 
        name = 'Missing Name', 
        categories, 
        authorImage,
        body = []
    } = props;

    return (
        <StyledSinglePost>
            <h1>{title}</h1>
            <h2>By {name}</h2>
            {categories && (
                <ul>
                    Posted in {categories.map(category => (
                        <li key={category}>
                            {category}
                        </li>
                    ))}
                </ul>
            )}
            {authorImage && (
                <div>
                    <img 
                        src={urlFor(authorImage)
                            .width(50)
                            .url()} />
                </div>
            )}
            <BlockContent 
                blocks={body}
                imageOptions={{ w:320, h: 240, fit: 'max' }}
                {...client.config()}
            />
        </StyledSinglePost>
    )
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
    title, 
    "name": author->name,
    "categories": categories[]->title,
    "authorImage": author->image,
    body
}`

Post.getInitialProps = async function(context) {
    // default the slug so it does not return undefined
    const { slug = "" } = context.query;
    return await client.fetch(query, { slug });
}

const StyledSinglePost = styled.article`
    width: 100%;
    height: calc(100vh - 60px);
    padding: 4rem;
    border: 1px solid yellow;
`

export default Post;