import React from 'react';
import styled from '@emotion/styled';
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaJsSquare } from "react-icons/fa";
import { SiMongodb } from 'react-icons/si';
import { DiNodejs } from 'react-icons/di';
import { rotateBadge } from '../styles/animations';

/***************** 
 TODO
    grab more icons and rotate banner
**********************/

export default function SkillsBanner() {
    return (
        <StyledSkills>
            <FaHtml5 className="skill-badge"/>
            <FaCss3Alt />
            <FaReact />
            <FaJsSquare />
            <SiMongodb />
            <DiNodejs />
        </StyledSkills>
    )
}

const StyledSkills = styled.section`
    width: 100%;
    border: 1px solid yellow;
    font-size: 8rem;
    padding: 4rem 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .skill-badge {
        animation: ${rotateBadge} 2s ease-out;
    }
`