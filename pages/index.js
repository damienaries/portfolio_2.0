import styled from '@emotion/styled';
import Banner from '../components/Banner';
import About from '../components/About';
import Featured from '../components/Featured';
import sanityClient from '../client';
import groq from 'groq';

export default function Home(props) {
  const { projects = [] } = props;
  
  // filter featured projects
  const featured = projects.filter(p => p.featured === true);

  return (
    <HomePage>
      <Banner />
      <Featured projects={featured} />
      <About />
    </HomePage>
  )
}

// Load all projects
Home.getInitialProps = async () => ({
  projects: await sanityClient.fetch(groq`
      *[_type == "project"]
  `)
})


// Page Styles
const HomePage = styled.main`
    width: 100%;
    position: relative;
`
