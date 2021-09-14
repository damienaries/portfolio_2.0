import styled from '@emotion/styled';
import Banner from '../components/Banner';
import About from '../components/About';
import Featured from '../components/Featured';

export default function Home() {
  return (
    <HomePage>
      <Banner />
      <Featured />
      <About />
    </HomePage>
  )
}

// Page Styles
const HomePage = styled.main`
    width: 100%;
    position: relative;
`
