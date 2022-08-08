import React from 'react';
import styled from '@emotion/styled';
import { SiMaterialUi, SiAmazonaws, SiReact, SiHtml5, SiCss3, SiNodeDotJs, SiNextDotJs, SiJavascript, SiTypescript, SiMongodb, SiTailwindcss, SiFirebase, SiStyledComponents, SiFigma } from 'react-icons/si';

export default function useIcons(props) {
    const {technology = []} = props;
    console.log('tech', technology)
    const icons = [SiMaterialUi, SiAmazonaws, SiReact, SiHtml5, SiCss3, SiNodeDotJs, SiNextDotJs, SiJavascript, SiTypescript, SiMongodb, SiTailwindcss, SiFirebase, SiStyledComponents, SiFigma]; 

    return icons;
}

export async function getStaticProps() {
   
    const technology = await sanityClient.fetch(groq`
        *[_type == "technology"]
      `)
    

    return {
      props: {
        technology,
      }
    }
}