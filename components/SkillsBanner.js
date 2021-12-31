import styled from '@emotion/styled';
import { SiMaterialUi, SiAmazonaws, SiReact, SiHtml5, SiCss3, SiNodeDotJs, SiNextDotJs, SiJavascript, SiTypescript, SiMongodb, SiTailwindcss, SiFirebase, SiStyledComponents, SiFigma } from 'react-icons/si';

export default function SkillsBanner({ skills }) {
    // TODO generate dynamic icon imports + make icon string into component

    return (
        <StyledSkills>
            <span className="skill-scrolling">
                <SiHtml5 className="skill" />
                <SiCss3 className="skill" />
                <SiJavascript className="skill" />
                <SiTypescript className="skill" />
                <SiReact className="skill" />
                <SiNextDotJs className="skill" />
                <SiMaterialUi className="skill" />
                <SiTailwindcss className="skill" />
                <SiStyledComponents className="skill" />
                <SiFigma className="skill" />
                <SiAmazonaws className="skill" />
                <SiMongodb className="skill" />
                <SiFirebase className="skill" />
                <SiNodeDotJs className="skill" />
            </span>   
            
            <span className="skill-scrolling">
                <SiHtml5 className="skill" />
                <SiCss3 className="skill" />
                <SiJavascript className="skill" />
                <SiTypescript className="skill" />
                <SiReact className="skill" />
                <SiNextDotJs className="skill" />
                <SiMaterialUi className="skill" />
                <SiTailwindcss className="skill" />
                <SiStyledComponents className="skill" />
                <SiFigma className="skill" />
                <SiAmazonaws className="skill" />
                <SiMongodb className="skill" />
                <SiFirebase className="skill" />
                <SiNodeDotJs className="skill" />
            </span>      
        </StyledSkills>
    )
}

const StyledSkills = styled.ul`
        display: flex;
        width: 100%;
        padding: 2rem;
        margin: 2rem 0 8rem;
        line-height: 2;
        background-color: var(--color-blue-light);
        overflow: hidden;

        .skill-scrolling {
            animation: scroll 30s linear infinite;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .skill {
            font-size: 10rem;
            margin: 2rem;

            &:hover {
                color: var(--color-blue-dark);
                filter: drop-shadow(0 0.25rem .5rem var(--color-white));
            }
        }

        @keyframes scroll {
            0% {
                transform: translate3d(0, 0, 0);
            }
            100% {
                transform: translate3d(-100%, 0, 0);
            }
        }
`
