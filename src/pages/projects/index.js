import styled from '@emotion/styled';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Project from '../../components/Project';
import projectsData from '../../../data/portfolio_data_copy.json';

export default function Projects() {
	const categories = ['work', 'freelance', 'personal'];
	const [currentTab, setCurrentTab] = useState('');
	const [currentProjects, setCurrentProjects] = useState([]);

	useEffect(() => {
		// check for tab value in session storage
		const saved = sessionStorage.getItem('currentTab');
		setCurrentTab(saved ? saved : 'work');

		//filter projects based on currentTab
		setCurrentProjects(projectsData.filter((p) => p.category === currentTab));
	}, [currentTab]);

	const handleClick = (c) => {
		setCurrentTab(c);
		sessionStorage.setItem('currentTab', c);
	};

	return (
		<StyledProjects>
			<section className="projects-container">
				<h1 className="page-title">Recent Work</h1>
				<div className="tabs-container">
					<nav className="tabs-head">
						{categories.map((c, idx) => (
							<h2
								onClick={() => handleClick(c)}
								className={'tab' + (currentTab === c ? ' current' : '')}
								key={idx}
							>
								{c}
							</h2>
						))}
					</nav>
					<section className="tabs-body">
						{currentProjects &&
							currentProjects.map((project, idx) => (
								<Project project={project} key={idx} />
							))}
					</section>
				</div>
			</section>
		</StyledProjects>
	);
}

const StyledProjects = styled.main`
	width: 100%;
	padding: 0 2rem;
	text-align: center;

	.page-title {
		font-size: var(--size-title-main);
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

		@media only screen and (max-width: 600px) {
			flex-direction: column;
		}
	}

	.tab {
		font-size: var(--size-title-section);
		font-weight: var(--weight-thin);
		text-transform: uppercase;
		padding: 1rem 2rem;

		&:hover {
			cursor: pointer;
			font-weight: var(--weight-bold);
		}

		&.current {
			font-weight: var(--weight-bold);
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
		font-size: var(--size-body);
		font-weight: var(--weight-thin);
	}
`;
