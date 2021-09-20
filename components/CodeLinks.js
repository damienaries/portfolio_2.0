import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import {MdOpenInNew} from 'react-icons/md'

export default function CodeLinks({ githubLink, liveLink }) {

    return (
        <StyledLinks>
                {githubLink !== undefined && (
                    <Link href={`${githubLink}`}>
                        <a className="code-link" target="_blank">
                            See Repo <MdOpenInNew className="icon" />
                        </a>
                    </Link>
                )}
                {liveLink !== undefined && (
                    <Link href={`${liveLink}`}>
                    <a className="code-link" target="_blank">
                        Visit Site <MdOpenInNew className="icon" />
                    </a>
                </Link>
                )}
            </StyledLinks>
    )
}

const StyledLinks = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 1rem;

    .code-link {
        font-size: 1.4rem;
        padding: .5rem 1.5rem;
        margin: .5rem;
        border-radius: 50px;
        background-color: var(--color-blue-light);
        transition: all .2s ease-out;
        display: flex;
        align-items: center;

        .icon {
            margin-left: .5rem;
        }

        &:hover {
            background-color: var(--color-blue-dark);
        }
    }
`
