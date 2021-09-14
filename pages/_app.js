import { Global } from '@emotion/react';
import { GlobalStyles } from '../styles/GlobalStyles';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Global styles={GlobalStyles} />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
