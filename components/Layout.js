import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useWindowDimensions from '../hooks/useWindowDimensions';
import SkillsBanner from './SkillsBanner';

const Layout = ({ children, theme, toggleTheme }) => {
	const router = useRouter();
	const [aboutOpen, setAboutOpen] = useState(false);
	const [isWorkPage, setIsWorkPage] = useState(false);
	const { width } = useWindowDimensions();

	const pageTitle =
		router.pathname === '/'
			? 'Welcome'
			: router.pathname.substring(1).toUpperCase();

	const toggleAbout = () => {
		setAboutOpen(!aboutOpen);
	};

	useEffect(() => {
		router.pathname === '/projects'
			? setIsWorkPage(true)
			: setIsWorkPage(false);
	}, [router.pathname]);

	return (
		<>
			<Head>
				<title>Damien Aries | {pageTitle}</title>
				<meta
					name="viewport"
					lang="eng"
					content="initial-scale=1.0, width=device-width"
				/>
				<link rel="icon" href="/icons/flux-capacitor.svg" />
			</Head>

			{isWorkPage && <SkillsBanner />}
			<div style={{ marginLeft: isWorkPage && width > 768 ? '100px' : 0 }}>
				<Navbar
					theme={theme}
					toggleTheme={toggleTheme}
					toggleAbout={toggleAbout}
				/>
				{children}
				<Footer />
			</div>
		</>
	);
};

export default Layout;
