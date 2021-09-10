import React from 'react';
import styled from '@emotion/styled';
import { moveInTop, fadeIn, moveInBottom } from '../styles/animations';


export default function Banner() {
    return (
        <Hero>
            <div className="title-box">
                <div className="header-title">
                    <h1 className="header-title-welcome">
                        Welcome
                    </h1>
                    <h2 className="header-title-me">
                        I&apos;m Damien
                    </h2>
                    <h3 className="header-title-sub">
                        Web developer based in Los Angeles
                    </h3>
                </div>
            </div>
        </Hero>
    )
}

const Hero = styled.section`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .title-box {
      padding: 3rem;
      width: fit-content;
      text-align: center;

      .header-title {
        &-welcome {
          font-size: 6rem;
          font-weight: var(--weight-thin);
          animation: ${moveInTop} 1.5s ease-in-out;
        }

        &-me {
          font-size: 3.5rem;
          font-weight: var(--weight-thin);
          letter-spacing: .5rem;
          margin: 2rem auto;
          animation: ${fadeIn} 1.5s;
          animation-delay: .5s;
          animation-fill-mode: backwards;
        }

        &-sub {
          font-size: 2rem;
          letter-spacing: .5rem;
          animation: ${moveInBottom} 1s ease-in-out;
          animation-delay: 1s;
          animation-fill-mode: backwards;
        }
      }
    }
`

