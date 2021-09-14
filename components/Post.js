import { useState, useEffect } from 'react';
import sanityClient from '../pages/client';
import styled from '@emotion/styled';
import Link from 'next/link';

export default function Post() {
    const [postData, setPost] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`*[type == "post"]{
            title, 
            slug, 
            mainImage{
                asset->{
                    _id,
                    url
                },
                alt
            }
        }`)
        .then((data) => setPost(data));
    },[])

    return (
        <StyledPosts>
            <section>
                <h1>Blog Posts Page</h1>
                <h2></h2>
                <div>
                    <article>
                    <Link>
                        <span>
                            <img />
                            <span>
                                <h3></h3>
                            </span>
                        </span>
                    </Link>
                        
                    </article>
                </div>
            </section>
        </StyledPosts>
    )
}

const StyledPosts = styled.div`

`