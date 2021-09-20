import styled from '@emotion/styled';
import Banner from '../components/Banner';
import About from '../components/About';
import Featured from '../components/Featured';
import sanityClient from '../client';
import groq from 'groq';

export default function Home(props) {
  const { projects = [], author = [] } = props;
  
  // filter featured projects
  const featured = projects.filter(p => p.featured === true);

  return (
    <HomePage>
      <Banner />
      <Featured projects={featured} />
      <About author={author[0]}/>
    </HomePage>
  )
}

// Load all projects and author data
Home.getInitialProps = async () => ({
  projects: await sanityClient.fetch(groq`
      *[_type == "project"]
  `),
  author: await sanityClient.fetch(groq`
      *[_type == "author" && name == "Damien"]
  `)
})


// Page Styles
const HomePage = styled.main`
    width: 100%;
    position: relative;
`
