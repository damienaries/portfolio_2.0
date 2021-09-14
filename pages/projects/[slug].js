import styled from '@emotion/styled';
import client from '../../client';
import groq from 'groq';
import ImageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

/*******************
 TODO 
    add stack data to sanity as array of techs used
 *********************/

function urlFor(source) {
    return ImageUrlBuilder(client).image(source);
}

const Project = (props) => {
    const { 
        title = 'Missing Title', 
        categories,
        mainImage,
        technologies,
        body = []
    } = props;

    return (
        <StyledProject>
            <h1>{title}</h1>
            {categories && (
                <ul>
                    Posted in {categories.map(category => (
                        <li key={category}>
                            {category}
                        </li>
                    ))}
                </ul>
            )}
            {mainImage && (
                <div>
                    <img 
                        src={urlFor(mainImage)
                            .width(100)
                            .url()} />
                </div>
            )}
            <BlockContent 
                blocks={body}
                imageOptions={{ w:320, h: 240, fit: 'max' }}
                {...client.config()}
            />
        </StyledProject>
    )
}

const query = groq`*[_type == "project" && slug.current == $slug][0]{
    title, 
    "categories": categories[]->title,
    mainImage,
    "technologies": technologies[]->title,
    body
}`

Project.getInitialProps = async function(context) {
    // default the slug so it does not return undefined
    const { slug = "" } = context.query;
    return await client.fetch(query, { slug });
}

const StyledProject = styled.section`
    width: 100%;
    height: calc(100vh - 60px);
    padding: 4rem;
    border: 1px solid purple;
`

export default Project;