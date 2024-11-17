import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { fadeIn } from '../styles/animations';

/*
    TODO
    restyle mobile nav, not fixed on mobile, left aligned under logo. theme switch to the right, for any screen size
*/

export default function Navbar({ theme, toggleTheme }) {
	const router = useRouter();
	const { width } = useWindowDimensions();
	const [navOpen, setIsNavOpen] = useState(false);

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

	return (
		<StyledNav>
			<div className="topbar-left" onClick={() => router.push('/')}>
				D<span className="name-logo">A</span>
			</div>

			<div className="topbar-right">
				{width > 600 ? (
					<>
						{/* full size nav */}
						<Link href="/">
							<a className="topbar-right-link">Home</a>
						</Link>
						<Link href="/projects">
							<a className="topbar-right-link">Work</a>
						</Link>
						<Link href="#contact">
							<a className="topbar-right-link">Contact</a>
						</Link>
						<div
							className="topbar-right-link theme-toggler"
							onClick={handleThemeChange}
						>
							{/* TODO geolocalize user to trigger theme change based on time of day, add info toast, upgrade hover effect */}
							{theme === 'dark' ? <FaSun /> : <FaMoon />}
						</div>
					</>
				) : (
					<div className="mobile-nav-action">
						{!navOpen ? (
							<FaBars className="action-button" onClick={toggleNav} />
						) : (
							<MdClose className="action-button" onClick={toggleNav} />
						)}
					</div>
				)}
			</div>
			{/* Mobile Nav full screen Modal */}
			{navOpen && (
				<div className="mobile-nav" style={{ right: !navOpen ? '-100%' : 0 }}>
					<Link href="/">
						<a className="mobile-nav-link" onClick={toggleNav}>
							Home
						</a>
					</Link>
					<Link href="/projects">
						<a className="mobile-nav-link" onClick={toggleNav}>
							Work
						</a>
					</Link>
					<Link href="#contact">
						<a className="mobile-nav-link" onClick={toggleNav}>
							Contact
						</a>
					</Link>
					<div
						className="mobile-nav-link theme-toggler"
						onClick={handleThemeChange}
					>
						{theme === 'dark' ? <FaSun /> : <FaMoon />}
					</div>
				</div>
			)}
		</StyledNav>
	);
}

const StyledNav = styled.header`
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 3rem;

	.topbar-left {
		font-size: var(--size-title-section);
		font-weight: var(--weight-thin);
		letter-spacing: 1px;

		&:hover {
			cursor: pointer;
			filter: brightness(90%);
		}

		.name-logo {
			font-weight: var(--weight-bold);
		}
	}

	.topbar-right {
		position: relative;
		display: flex;
		align-items: center;

		.theme-toggler {
			transform: translateY(2px);
			&:hover {
				cursor: pointer;
			}
		}
	}

	.topbar-right-link {
		margin: 1rem;
		font-size: var(--size-body);
		letter-spacing: 3px;
		transition: filter 0.5s ease;
		padding-bottom: 0.25rem;

		&:hover:not(.theme-toggler) {
			border-bottom: 2px solid ${(props) => props.theme.borderColor};
		}
	}

	.action-button {
		font-size: 2rem;

		&:hover {
			cursor: pointer;
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
