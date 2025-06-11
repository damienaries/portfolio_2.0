import { Global, ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { GlobalStyles, darkTheme, lightTheme } from '../styles/globalStyles';

function MyApp({ Component, pageProps }) {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState('dark');

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') || 'dark';
		setTheme(savedTheme);
		setMounted(true);
	}, []);

	useEffect(() => {
		if (mounted) {
			localStorage.setItem('theme', theme);
		}
	}, [theme, mounted]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	// Prevent flash of wrong theme
	if (!mounted) {
		return null;
	}

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
