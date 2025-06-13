import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useWindowDimensions from '../hooks/useWindowDimensions';
import SkillsBanner from './SkillsBanner';
import { pageTransition } from '../styles/animations';

const Layout = ({ children, theme, toggleTheme }) => {
	const router = useRouter();
	const [aboutOpen, setAboutOpen] = useState(false);
	const [isResumePage, setIsResumePage] = useState(false);
	const { width } = useWindowDimensions();

	const pageTitle =
		router.pathname === '/'
			? 'Welcome'
			: router.pathname.substring(1).toUpperCase();

	const toggleAbout = () => {
		setAboutOpen(!aboutOpen);
	};

	useEffect(() => {
		router.pathname === '/resume'
			? setIsResumePage(true)
			: setIsResumePage(false);
	}, [router.pathname]);

	return (
		<>
			<Head>
				<title>{`Damien Aries | ${pageTitle}`}</title>
				<meta
					name="viewport"
					lang="eng"
					content="initial-scale=1.0, width=device-width"
				/>
				<link rel="icon" href="/icons/flux-capacitor.svg" />
			</Head>

			{isResumePage && <SkillsBanner />}
			<div style={{ marginLeft: isResumePage && width > 768 ? '100px' : 0 }}>
				<Navbar
					theme={theme}
					toggleTheme={toggleTheme}
					toggleAbout={toggleAbout}
				/>
				<AnimatePresence mode="wait">
					<motion.div
						key={router.pathname}
						initial={pageTransition.initial}
						animate={pageTransition.animate}
						exit={pageTransition.exit}
						transition={pageTransition.transition}
					>
						{children}
					</motion.div>
				</AnimatePresence>
				<Footer />
			</div>
		</>
	);
};

export default Layout;
