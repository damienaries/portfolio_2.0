import { Global } from '@emotion/react';
import { GlobalStyles } from '../styles/globalStyles';
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
