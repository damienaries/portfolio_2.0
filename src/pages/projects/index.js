import styled from '@emotion/styled';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Project from '../../components/Project';
import projectsData from '../../../data/portfolio_data_copy.json';
import { tabTransition } from '../../styles/animations';
import AnimatedUnderline from '../../components/AnimatedUnderline';

export default function Projects({ sortedProjects }) {
	const categories = ['work', 'freelance', 'personal'];
	const [currentTab, setCurrentTab] = useState('');
	const [currentProjects, setCurrentProjects] = useState([]);

	useEffect(() => {
		// check for tab value in session storage
		const saved = sessionStorage.getItem('currentTab');
		setCurrentTab(saved ? saved : 'work');

		//filter projects based on currentTab
		setCurrentProjects(sortedProjects.filter((p) => p.category === currentTab));
	}, [currentTab, sortedProjects]);

	const handleClick = (c) => {
		setCurrentTab(c);
		sessionStorage.setItem('currentTab', c);
	};

	return (
		<StyledProjects>
			<section className="projects-container">
				<h2 className="page-title">Recent Work</h2>
				<div className="tabs-container">
					<nav className="tabs-head">
						{categories.map((c, idx) => (
							<motion.h4
								key={idx}
								onClick={() => handleClick(c)}
								className={'tab' + (currentTab === c ? ' current' : '')}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								{c}
								{currentTab === c && (
									<AnimatedUnderline
										layoutId="tab-underline"
										className="tab-underline"
									/>
								)}
							</motion.h4>
						))}
					</nav>
					<section className="tabs-body">
						<AnimatePresence mode="wait">
							<motion.div
								key={currentTab}
								initial={tabTransition.initial}
								animate={tabTransition.animate}
								exit={tabTransition.exit}
								transition={tabTransition.transition}
							>
								{currentProjects &&
									currentProjects.map((project, idx) => (
										<Project project={project} key={idx} />
									))}
							</motion.div>
						</AnimatePresence>
					</section>
				</div>
			</section>
		</StyledProjects>
	);
}

export async function getStaticProps() {
	// Sort projects by publishedAt date in descending order (newest first)
	const sortedProjects = [...projectsData].sort((a, b) => {
		return new Date(b.publishedAt) - new Date(a.publishedAt);
	});

	return {
		props: {
			sortedProjects,
		},
	};
}

const StyledProjects = styled.main`
	width: 100%;
	padding: 0 2rem;
	text-align: center;

	.page-title {
		font-weight: var(--weight-thin);
		text-transform: capitalize;
		margin: 3rem auto;
	}

	.projects-container {
		width: 100%;
		max-width: 1300px;
		margin: 2rem auto;
	}

	.tabs-head {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 2rem auto;
	}

	.tab {
		font-weight: var(--weight-thin);
		text-transform: uppercase;
		padding: 0.5rem;
		margin: 0 1rem;
		position: relative;
		border-bottom: 2px solid transparent;
		transition: all 0.3s ease;

		&:hover {
			cursor: pointer;
			border-bottom: 2px solid
				${(props) =>
					props.theme.text === 'var(--color-gray-dark)'
						? 'rgba(115, 121, 128, 0.4)'
						: 'rgba(226, 232, 240, 0.3)'};
		}

		&.current {
			font-weight: var(--weight-bold);
		}

		.tab-underline {
			position: absolute;
			left: 0;
			bottom: -2px;
			height: 2px;
			background: ${(props) => props.theme.text};
			border-radius: 2px;
		}
	}

	.tabs-body {
		margin: 2rem auto;
	}

	.section-title {
		font-size: var(--size-title-section);
		font-weight: var(--weight-thin);
	}

	.description {
		font-size: var(--text-body);
		font-weight: var(--weight-thin);
	}

	@media screen and (max-width: 768px) {
		padding: 0 1rem;

		.page-title {
			margin: 0 auto 1rem;
		}

		.tabs-head {
			margin: 0 auto;
		}

		.tabs-body {
			margin: 0 auto;
		}

		.tab {
			padding: 0.5rem 1rem;
			margin: 0;
		}
	}
`;
