import { ThemeProvider } from '@emotion/react';
import Layout from '../components/layout/Layout';
import { GlobalStyles, lightTheme } from '../styles/globalStyles';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={lightTheme}>
			<GlobalStyles theme={lightTheme} />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}

export default MyApp;
