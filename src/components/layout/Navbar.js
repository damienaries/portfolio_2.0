import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { fadeIn } from '../styles/animations';
import About from '../ui/About';

/*
    TODO
    restyle mobile nav, not fixed on mobile, left aligned under logo. theme switch to the right, for any screen size
*/

export default function Navbar({ theme, toggleTheme }) {
	const router = useRouter();
	const { width } = useWindowDimensions();
	const [navOpen, setIsNavOpen] = useState(false);
	const [aboutOpen, setAboutOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setIsMobile(width < 768);
	}, [width]);

	// Lock scroll
	useEffect(() => {
		if (navOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [navOpen]);

	// toggle mobile nav, auto close 15sec
	const toggleNav = () => {
		setIsNavOpen((prevState) => !prevState);
		setTimeout(() => {
			setIsNavOpen(false);
		}, 15000);
	};

	const handleThemeChange = () => {
		setIsNavOpen(false);
		toggleTheme();
	};

	const toggleAbout = () => {
		setAboutOpen(!aboutOpen);
	};

	return (
		<>
			<StyledNav>
				<div className="nav-container">
					<Link href="/" className="logo">
						DA
					</Link>
					<nav className="nav-links">
						<Link href="/" className={router.pathname === '/' ? 'active' : ''}>
							Home
						</Link>
						<Link
							href="/projects"
							className={router.pathname === '/projects' ? 'active' : ''}
						>
							Work
						</Link>
						<button onClick={toggleAbout}>About</button>
					</nav>
				</div>
			</StyledNav>
			{aboutOpen && <About close={toggleAbout} />}
		</>
	);
}

const StyledNav = styled.nav`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 100;
	background: var(--color-background);
	border-bottom: 1px solid var(--color-border);

	.nav-container {
		max-width: 1300px;
		margin: 0 auto;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-size: var(--size-title-main);
		font-weight: var(--weight-bold);
		text-decoration: none;
		color: var(--color-text);
	}

	.nav-links {
		display: flex;
		gap: 2rem;
		align-items: center;

		a,
		button {
			font-size: var(--size-text);
			color: var(--color-text);
			text-decoration: none;
			background: none;
			border: none;
			cursor: pointer;
			padding: 0.5rem 0;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				width: 0;
				height: 2px;
				background: var(--color-text);
				transition: width 0.3s ease;
			}

			&:hover:after,
			&.active:after {
				width: 100%;
			}
		}
	}

	.mobile-nav {
		position: fixed;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem 1rem;
		height: 100vh;
		width: 100vw;
		background-color: ${(props) => props.theme.background};
		animation: ${fadeIn} 0.3s ease-out;
		z-index: 100;

		&-link {
			text-align: center;
			width: fit-content;
			margin: 1rem auto;
			font-size: 2.5rem;
			letter-spacing: 3px;

			&:focus,
			&:active {
				border-bottom: 1px solid var(--color-white);
			}
		}
	}
`;
