import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Me from '../public/assets/images/DamienPic1.jpg'; 

/********************** 
  TODO
    Setup bio & image from Sanity
    Also resume fields from sanity?
************************/

export default function About() {
    return (
        <StyledAbout id="about">
            <h2 className="section-title">About me</h2>
            <div className="flex-container">
                <div className="about-left">
                    <p>
                        I am a Front End focused MERN Stack developer, I love to build beautiful, smooth interfaces and experiences in JavaScript and React.
                    </p>
                </div>
                <div className="about-right">
                    <div className="image-container">
                        <Image src={Me} className="my-pic" alt="Sort of recent picture of me" />
                    </div>
                </div>
            </div>    
        </StyledAbout>
    )
}

const StyledAbout = styled.section`
    width: 100%;
    padding: 2rem 4rem;

    .flex-container {
        display: flex;
        justify-content: space-between;
    }

    .section-title {
        font-size: 2.5rem;
        position: sticky;
        top: 1rem;
        text-align: center;
        margin-bottom: 4rem;
        font-weight: var(--weight-thin);
    }

    .about-left {
        height: 100%;
		width: 60%;
		margin: 0 auto;
		font-size: 1.6rem;
		letter-spacing: 1.5px;

		p {
			padding: 1rem;
		}
    }

    .about-right {

        .image-container {
            width: 35%;
            /* margin: 0 auto; */
            margin: 2rem auto;

        }

        .my-pic {
            /* width: 100%; */
            max-width: 15rem;
            height: auto;
            border-radius: var(--radius);
        }
    }

    @media screen and (max-width: 600px) {
        .flex-container {
            flex-direction: column;
        }
    }
`