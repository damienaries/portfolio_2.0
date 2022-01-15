import React from 'react';
import styled from '@emotion/styled';
import BlockContent from '@sanity/block-content-to-react';
import client from '../lib/client';

// <BlockContent 
//                 blocks={body}
//                 imageOptions={{ w:320, h: 240, fit: 'max' }}
//                 {...client.config()}
//             />
/****************************************
    Also have access to technologies and categories in props
 ******************************************/

export default function JobCard({ job }) {
    const { title, company, to, from, body } = job;
    
    return (
        <StyledJobCard>
            <div className="info">
                <h4 className="job">
                    { title } - { company }
                </h4>
                <span className="dates">
                    {to ? `From ${from} to ${to}` : `Since ${from}`}
                </span>
            </div>
            
            <div className="description">
                <BlockContent blocks={body} {...client.config()} />
            </div>
        </StyledJobCard>
    )
}

const StyledJobCard = styled.article`
    width: 80%;
    margin: 2rem auto;
    padding: 2rem 3rem;
    background-image: linear-gradient(
            to bottom right,
            var(--color-blue-light),
            var(--color-blue-light)
        );
    border-radius: var(--radius);

    .info {
        display: flex;
        justify-content: space-between;
        font-size: var(--size-subtitle);
        padding-bottom: 1rem;
        letter-spacing: 1px;
    }

    .description {
        text-align: left;
        font-size: var(--size-body);
    }

    @media screen and (max-width: 900px) {
        width: 90%;

        .info {
            flex-direction: column;
            align-items: flex-start;
            

            .job {
                margin-bottom: .5rem;
                text-align: left;
            }
        }
    }
`
