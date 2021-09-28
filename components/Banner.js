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
                       Hi, I&apos;m Damien
                    </h2>
                    {/*<h3 className="header-title-sub">
                        Web developer based in Los Angeles
                    </h3>*/}
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

        &-welcome {
          font-size: var(--size-title-main);
          font-weight: var(--weight-thin);
          animation: ${moveInTop} 1s ease-in-out;
        }

        &-me {
          font-size: var(--size-title-section);
          font-weight: var(--weight-thin);
          letter-spacing: .5rem;
          margin: 2rem auto;
          animation: ${fadeIn} 1.5s;
          animation-delay: .5s;
          animation-fill-mode: backwards;
        }

        &-sub {
          font-size: var(--size-subtitle);
          letter-spacing: .5rem;
          font-weight: var(--weight-thin);
          animation: ${fadeIn} 1.5s ease-in-out;
          animation-delay: 1s;
          animation-fill-mode: backwards;
        }
      }

      @media screen and (max-width: 600px) {
        .header-title-sub {
          display: none;
        }
      }
    }

    
`

