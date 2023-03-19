import styled from "@emotion/styled";
import groq from "groq";
import About from "../components/About";
import Banner from "../components/Banner";
import sanityClient from "../lib/client";

export default function Home(props) {
  const { projects = [], author = [] } = props;

  return (
    <HomePage>
      <Banner />
      <About author={author[0]} />
      {/* <Featured projects={projects} /> */}
    </HomePage>
  );
}

export async function getStaticProps() {
  const projects = await sanityClient.fetch(groq`
      *[_type == "project" && featured == true]
    `);
  const author = await sanityClient.fetch(groq`
      *[_type == "author" && name == "Damien"]
    `);
  return {
    props: {
      projects,
      author,
    },
  };
}

// Page Styles
const HomePage = styled.main`
  width: 100%;
  position: relative;
`;
