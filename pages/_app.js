import { Global, ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { GlobalStyles, darkTheme, lightTheme } from '../styles/globalStyles';

function MyApp({ Component, pageProps }) {
	const [theme, setTheme] = useState(null);

	useEffect(() => {
		const savedValue = localStorage.getItem('theme');
		setTheme(savedValue ? savedValue : 'light');
	}, []);

	useEffect(() => {
		if (typeof theme === 'string') {
			localStorage.setItem('theme', theme);
		}
	}, [theme]);

	const toggleTheme = (e) => {
		if (theme === 'light') {
			setTheme('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			setTheme('light');
			localStorage.setItem('theme', 'light');
		}
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
