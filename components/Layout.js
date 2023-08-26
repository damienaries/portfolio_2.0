import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Layout = ({ children, theme, toggleTheme }) => {
	const router = useRouter();
	const pageTitle =
		router.pathname === '/'
			? 'Welcome'
			: router.pathname.substring(1).toUpperCase();

	return (
		<StyledLayout id="layout">
			<Head>
				<title>Damien Aries | {pageTitle}</title>
				<meta
					name="viewport"
					lang="eng"
					content="initial-scale=1.0, width=device-width"
				/>
				<link rel="icon" href="/flux-capacitor.svg" />
			</Head>
			<Navbar theme={theme} toggleTheme={toggleTheme} />
			{children}
			<Footer />
		</StyledLayout>
	);
};

const StyledLayout = styled.div`
	position: relative;
`;

export default Layout;
