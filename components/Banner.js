import React from 'react';
import styled from '@emotion/styled';
import { fadeIn, moveInBottom } from '../styles/animations';

export default function Banner() {  

    return (
        <Hero>
            <div className="title-box">
                <div className="header-title">  
                    <h1 className="header-title-me">
                       Hi. <br /> I&apos;m Damien.
                    </h1>
                    <h2 className="header-title-welcome">
                        Welcome
                    </h2>
                </div>
            </div>
        </Hero>
    )
}

const Hero = styled.section`
    height: 85vh;
    width: 100%;
    position: relative;

    .title-box {
      padding: 3rem;
      width: fit-content;
      text-align: center;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);

      .header-title {
        &-me {
          font-size: var(--size-title-main);
          font-weight: var(--weight-thin);
          letter-spacing: .5rem;
          margin: 2rem auto;
          animation: ${fadeIn} 2s;
          animation-fill-mode: backwards;
        }

        &-welcome {
          font-size: var(--size-title-main);
          font-weight: var(--weight-thin);
          animation: ${moveInBottom} 2.5s ease-in-out;
        }
      }
    }
`

