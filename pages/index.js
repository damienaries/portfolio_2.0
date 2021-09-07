import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import styled from '@emotion/styled';

export default function Home() {
  return (
    <HomePage>
        <h2>Welcome to my new portfolio</h2>
    </HomePage>
  )
}

// Use layout
Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}

// Page Styles
const HomePage = styled.main`
   background: #eee;
   width: 100%;
   height: 100vh;
`
