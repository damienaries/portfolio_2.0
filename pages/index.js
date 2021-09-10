import styled from '@emotion/styled';
import Banner from '../components/Banner';
import About from '../components/About';
import SkillsBanner from '../components/SkillsBanner';

export default function Home() {
  return (
    <HomePage>
      <Banner />
      <About />
     {/* <SkillsBanner /> use next to projects */}
    </HomePage>
  )
}

// Page Styles
const HomePage = styled.main`
    width: 100%;
    /* height: 100vh; */
    position: relative;

    
`
