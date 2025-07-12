import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaBars, FaMoon, FaSun, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { BiLogoGmail } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { fadeIn } from '../styles/animations';
import AnimatedUnderline from './AnimatedUnderline';

export default function Navbar({ theme, toggleTheme }) {
	const router = useRouter();
	const { width } = useWindowDimensions();
	const [navOpen, setIsNavOpen] = useState(false);
	const [contactOpen, setContactOpen] = useState(true);
	const navTimeoutRef = useRef();

	// Lock scroll
	useEffect(() => {
		if (navOpen) {
			document.body.style.overflow = 'hidden';
			// Start autoclose timer
			// navTimeoutRef.current = setTimeout(() => {
			// 	setIsNavOpen(false);
			// }, 15000);
		} else {
			document.body.style.overflow = 'unset';
			// Clear autoclose timer
			if (navTimeoutRef.current) {
				clearTimeout(navTimeoutRef.current);
				navTimeoutRef.current = null;
			}
		}
	}, [navOpen]);

	// Close contact dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (contactOpen && !event.target.closest('.contact-dropdown')) {
				setContactOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [contactOpen]);

	// toggle mobile nav, auto close 15sec
	const toggleNav = () => {
		setIsNavOpen((prevState) => !prevState);
	};

	const handleThemeChange = () => {
		setIsNavOpen(false);
		toggleTheme();
	};

	const toggleContact = () => {
		setContactOpen(!contactOpen);
	};

	return (
		<StyledNav>
			<div className="topbar-left" onClick={() => router.push('/')}>
				D<strong>A</strong>
			</div>

			<div className="topbar-right">
				{width > 600 ? (
					<>
						{/* full size nav */}
						<Link
							href="/"
							className={`topbar-right-link ${
								router.pathname === '/' ? 'active' : ''
							}`}
						>
							Home
							{router.pathname === '/' && (
								<AnimatedUnderline
									layoutId="navbar-underline"
									className="navbar-underline"
								/>
							)}
						</Link>
						<Link
							href="/projects"
							className={`topbar-right-link ${
								router.pathname === '/projects' ? 'active' : ''
							}`}
						>
							Work
							{router.pathname === '/projects' && (
								<AnimatedUnderline
									layoutId="navbar-underline"
									className="navbar-underline"
								/>
							)}
						</Link>
						<Link
							href="/resume"
							className={`topbar-right-link ${
								router.pathname === '/resume' ? 'active' : ''
							}`}
						>
							Resume
							{router.pathname === '/resume' && (
								<AnimatedUnderline
									layoutId="navbar-underline"
									className="navbar-underline"
								/>
							)}
						</Link>
						<div className="contact-dropdown">
							<div className="topbar-right-link" onClick={toggleContact}>
								Contact
							</div>
							<AnimatePresence>
								{contactOpen && (
									<motion.div
										className="dropdown-menu"
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2 }}
									>
										<Link
											href="mailto:damien@damienaries.com"
											className="dropdown-item"
											target="_blank"
											rel="noopener noreferrer"
										>
											<BiLogoGmail className="icon" />
											Email
										</Link>
										<Link
											href="https://github.com/damienaries"
											className="dropdown-item"
											target="_blank"
											rel="noopener noreferrer"
										>
											<FaGithub className="icon" />
											GitHub
										</Link>
										<Link
											href="https://linkedin.com/in/damienaries"
											className="dropdown-item"
											target="_blank"
											rel="noopener noreferrer"
										>
											<FaLinkedinIn className="icon" />
											LinkedIn
										</Link>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
						<div
							className="topbar-right-link theme-toggler"
							onClick={handleThemeChange}
						>
							{theme === 'dark' ? <FaSun /> : <FaMoon />}
						</div>
					</>
				) : (
					<div className="mobile-nav-action-group">
						<div className="theme-toggler-mobile" onClick={handleThemeChange}>
							{theme === 'dark' ? <FaSun /> : <FaMoon />}
						</div>
						{!navOpen && (
							<FaBars className="action-button" onClick={toggleNav} />
						)}
					</div>
				)}
			</div>
			{/* Mobile Nav full screen Modal */}
			{navOpen && (
				<div className="mobile-nav" style={{ right: !navOpen ? '-100%' : 0 }}>
					<MdClose className="action-button close-btn" onClick={toggleNav} />

					<Link
						href="/"
						className={`mobile-nav-link ${
							router.pathname === '/' ? 'active' : ''
						}`}
						onClick={toggleNav}
					>
						Home
					</Link>
					<Link
						href="/projects"
						className={`mobile-nav-link ${
							router.pathname === '/projects' ? 'active' : ''
						}`}
						onClick={toggleNav}
					>
						Work
					</Link>
					<Link
						href="/resume"
						className={`mobile-nav-link ${
							router.pathname === '/resume' ? 'active' : ''
						}`}
						onClick={toggleNav}
					>
						Resume
					</Link>
					<div className="mobile-contact">
						<div className="mobile-nav-link" onClick={toggleContact}>
							Contact
						</div>
						<AnimatePresence>
							{contactOpen && (
								<motion.div
									className="mobile-contact-options"
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.2 }}
								>
									<Link
										href="mailto:damien@damienaries.com"
										className="mobile-nav-link sub-link"
										target="_blank"
										rel="noopener noreferrer"
									>
										<BiLogoGmail className="icon" />
										Email
									</Link>
									<Link
										href="https://github.com/damienaries"
										className="mobile-nav-link sub-link"
										target="_blank"
										rel="noopener noreferrer"
									>
										<FaGithub className="icon" />
										GitHub
									</Link>
									<Link
										href="https://linkedin.com/in/damienaries"
										className="mobile-nav-link sub-link"
										target="_blank"
										rel="noopener noreferrer"
									>
										<FaLinkedinIn className="icon" />
										LinkedIn
									</Link>
								</motion.div>
							)}
						</AnimatePresence>
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
		font-weight: var(--font-weight-thin);
		font-size: var(--text-md);

		&:hover {
			cursor: pointer;
			filter: brightness(90%);
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
		font-size: var(--text-xs);
		letter-spacing: 3px;
		transition: filter 0.5s ease;
		padding-bottom: 0.25rem;
		border-bottom: 2px solid transparent;
		position: relative;

		&:hover:not(.theme-toggler) {
			border-bottom: 2px solid ${(props) => props.theme.borderColor};
		}

		.navbar-underline {
			position: absolute;
			left: 0;
			bottom: -var();
			height: 2px;
			background: ${(props) => props.theme.borderColor};
			border-radius: 2px;
		}
	}

	.contact-dropdown {
		position: relative;
		display: inline-block;

		.dropdown-menu {
			position: absolute;
			top: 100%;
			right: 0;
			transform: translateX(0);
			background-color: ${(props) => props.theme.cardBackground};
			backdrop-filter: blur(5px);
			border-radius: var(--radius);
			box-shadow: ${(props) => props.theme.boxShadow};
			padding: 0.5rem 0;
			min-width: 150px;
			z-index: 1000;
			margin-top: 0.5rem;

			&::before {
				content: '';
				position: absolute;
				top: -5px;
				right: 20px;
				transform: translateX(0);
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-bottom: 5px solid ${(props) => props.theme.cardBackground};
			}
		}

		.dropdown-item {
			display: flex;
			align-items: center;
			padding: 0.75rem 1.5rem;
			color: ${(props) => props.theme.text};
			text-decoration: none;
			transition: background-color 0.2s ease;
			font-size: var(--text-body);
			letter-spacing: 1px;

			.icon {
				margin-right: 0.75rem;
				font-size: var(--text-md);
			}

			&:hover {
				background-color: ${(props) => props.theme.background};
			}
		}
	}

	.action-button {
		font-size: var(--text-md);
		z-index: 100;

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
		z-index: 50;

		&-link {
			text-align: center;
			width: fit-content;
			margin: 1rem auto;
			font-size: var(--text-xxl);
			letter-spacing: 3px;
			border-bottom: 2px solid transparent;

			&:focus,
			&:active,
			&.active {
				border-bottom: 2px solid ${(props) => props.theme.borderColor};
			}
		}

		.close-btn {
			position: absolute;
			top: 1rem;
			right: 1.5rem;
			z-index: 100;
		}
	}

	.mobile-contact {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 0 2rem;

		.sub-link {
			font-size: var(--text-md);
			margin: 1rem auto;
			display: flex;
			align-items: center;
			width: 100%;

			.icon {
				margin-right: 1rem;
				font-size: var(--text-lg);
			}
		}
	}

	.mobile-nav-action-group {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.theme-toggler-mobile {
		display: flex;
		align-items: center;
		font-size: var(--text-md);
		margin-right: 0.2rem;
		cursor: pointer;
	}
	.mobile-nav-action .action-button {
		font-size: var(--text-md);
	}

	@media screen and (max-width: 768px) {
		padding: 1.5rem;
		.mobile-nav-link {
			font-size: var(--text-md);
		}
	}

	@media screen and (max-width: 600px) {
		.dropdown-item,
		.mobile-contact .sub-link {
			font-size: var(--text-xs) !important;
		}
		.dropdown-menu .icon,
		.mobile-contact .icon {
			font-size: var(--text-md) !important;
		}
	}
`;
