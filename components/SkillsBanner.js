import { useEffect } from 'react';
import styled from '@emotion/styled';

export default function SkillsBanner({ skills }) {
    console.log(skills[0].icon)
    // make icon string into component

    // need to generate <MdOpenInNew className="icon" /> 
    /*
        useEffect(() => {
            let icon = '';
            skills.map(skill => {
                return `<${skill.icon} className="skill"/>`
            })
        },[])
    
    
    */

    return (
        <StyledSkills>
            {skills && skills.map((skill) => (
                <skill.icon key={skill._id}className="skill"/>
            ))}
        </StyledSkills>
    )
}

const StyledSkills = styled.section`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        margin: 2rem auto;
        line-height: 2;

        .skill {
            font-size: var(--size-body);
            padding: .5rem 1rem;
            background-color: var(--color-blue-light);
            margin: 1rem;
            border-radius: var(--radius);
        }

`