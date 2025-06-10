import { Global, ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { GlobalStyles, darkTheme, lightTheme } from '../styles/globalStyles';

function MyApp({ Component, pageProps }) {
	const [theme, setTheme] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('theme') || 'dark';
		}
		return 'dark';
	});

	useEffect(() => {
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
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
