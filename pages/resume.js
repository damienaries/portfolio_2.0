import styled from '@emotion/styled';
// import Image from 'next/image';

/******************************
 TODO 
    Add skills, exp, education to sanity
 ********************************/

export default function Resume() {
    return (
        <StyledResume>
            <section className="resume-container">
                <div className="resume-skills">
                    <h2 className="section-title">Skills</h2>
                    <ul className="skills-list">
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>Bootstrap</li>
                        <li>SASS</li>
                        <li>Material UI</li>
                        <li>JavaScript</li>
                        <li>Typescript</li>
                        <li>React</li>
                        <li>Express</li>
                        <li>MongoDB</li>
                        <li>Node</li>
                        <li>Firebase</li>
                        <li>AWS</li>
                    </ul>
                </div>
                <div className="resume-exp">
                <h4 className="section-title">Experience</h4>
                    <ul className="exp-list">
                        <li className="job">
                            <p className="job-title">
                                Full Stack Developer ( Intern )
                            </p>
                            <p className="company">
                                CONCEPT.app
                            </p>
                            <p className="description">
                                Concept is a social platform for human flourishing
                                built in JavaScript, React and Firebase. My role there
                                as a member of the startup’s founding dev team was
                                distributed across the stack, with a Front-End focus to
                                build foundational features like a forum page and our
                                onboarding slides.
                            </p>
                        </li>
                        <li className="exp-list-item"></li>
                        <li className="exp-list-item"></li>
                        <li className="exp-list-item"></li>
                        <li className="exp-list-item"></li>
                    </ul>
                </div>
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
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);

        .resume {
            margin: 0 auto;
        }
    }
`