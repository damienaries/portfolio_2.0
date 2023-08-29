import { Global, ThemeProvider } from '@emotion/react';
import { useState } from 'react';
import Layout from '../components/Layout';
import { GlobalStyles, darkTheme, lightTheme } from '../styles/globalStyles';

function MyApp({ Component, pageProps }) {
	const [theme, setTheme] = useState('light');

	const toggleTheme = (e) => {
		theme === 'light' ? setTheme('dark') : setTheme('light');
	};

	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<Layout toggleTheme={toggleTheme} theme={theme}>
				<Global styles={GlobalStyles} />
				<Component {...pageProps} theme={theme} />
			</Layout>
		</ThemeProvider>
	);
}

export default MyApp;
