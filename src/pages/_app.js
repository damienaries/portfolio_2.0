import { Global, ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { GlobalStyles, darkTheme, lightTheme } from '../styles/globalStyles';

function MyApp({ Component, pageProps }) {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState('dark');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('theme') || 'dark';
			setTheme(savedTheme);
			setMounted(true);
		}
	}, []);

	useEffect(() => {
		if (mounted && typeof window !== 'undefined') {
			localStorage.setItem('theme', theme);
		}
	}, [theme, mounted]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	// Use default theme during SSR to prevent hydration mismatch
	const currentTheme = mounted ? theme : 'dark';

	return (
		<ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
			<Layout toggleTheme={toggleTheme} theme={currentTheme}>
				<Global styles={GlobalStyles} />
				<Component {...pageProps} theme={currentTheme} />
			</Layout>
		</ThemeProvider>
	);
}

export default MyApp;
