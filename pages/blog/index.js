import sanityClient from '../../client';
import styled from '@emotion/styled';
import Link from 'next/link';
import groq from 'groq';

export default function Blog(props) {
    const { posts = [] } = props;

    return (
        <StyledBlog>
                <h1>Blog Posts Page</h1>
                <h2>Welcome to my page of blog posts</h2>
                <section className="posts-container">
                {
                    posts.map(
                        ({ _id, title = '', slug = '', _updatedAt = ''}) => 
                        slug && (
                            <li key={_id}>
                                <Link 
                                    href="/blog/[slug]" 
                                    as={`/blog/${slug.current}`}>
                                    <a>{title}</a>
                                </Link>{" - "}
                                ({new Date(_updatedAt).toDateString()})
                            </li>
                        ))
                }
                </section>
        </StyledBlog>
    )
}

Blog.getInitialProps = async () => ({
    posts: await sanityClient.fetch(groq`
        *[_type == "post" && publishedAt < now()]|order(publishedAt desc)
    `)
})

const StyledBlog = styled.section`
    width: 100%;
    height: 100vh;
    border: 1px solid yellow;
    padding: 4rem;
    
`