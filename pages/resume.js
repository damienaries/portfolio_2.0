import styled from '@emotion/styled';
import Image from 'next/image';

export default function Resume() {
    return (
        <StyledResume>
            <section className="resume-container">
                <Image 
                    src='/assets/images/resume.png' 
                    width={600}
                    height={800}
                    alt="resume" className="resume"/>
            </section>
        </StyledResume>
    )
}

const StyledResume = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;

    .resume-container {
        width: 60%;
        height: 90%;
        padding: 5rem;
        overflow: scroll;
        text-align: center;
        border-radius: var(--radius);
        background-image: linear-gradient(
            to bottom right,
            var(--color-blue-light),
            var(--color-blue-light)
        );
        backdrop-filter: blur(2px);

        .resume {
            margin: 0 auto;
        }
    }
`