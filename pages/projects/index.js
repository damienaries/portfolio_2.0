import styled from '@emotion/styled';
import groq from 'groq';
import { useEffect, useState } from 'react';
import ContributionCalendar from '../../components/ContributionCalendar';
import Project from '../../components/Project';
import sanityClient from '../../lib/client';

export default function Projects(props) {
	const { projects = [], calendar } = props;
	const categories = ['work', 'freelance', 'personal'];
	const [currentTab, setCurrentTab] = useState('work');
	const [currentProjects, setCurrentProjects] = useState([]);

	useEffect(() => {
		//filter projects based on currentTab
		setCurrentProjects(projects.filter((p) => p.category === currentTab));
	}, [currentTab]);

	const handleClick = (c) => {
		setCurrentTab(c);
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
							currentProjects.map((project) => (
								<Project project={project} key={project._id} />
							))}
					</section>
				</div>
			</section>

			<h3 className="section-title">Coding Contributions</h3>
			<p className="description">
				Most of the code I write is in private repositories, so this widget
				gives you a little insight on what I'm up to on{' '}
				<a href="https://gitlab.com/damien-aries" target="_blank">
					Gitlab
				</a>
				.
			</p>

			{calendar && <ContributionCalendar calendar={calendar} />}
		</StyledProjects>
	);
}

export async function getStaticProps() {
	// get Project data from sanity
	const projects = await sanityClient.fetch(groq`
		*[_type == "project"]{
			title, 
			mainImage,
			category,
			"technologies": technologies[]->title,
			body,
			githubLink,
			liveLink,
			publishedAt
			} | order(publishedAt desc)
	`);

	// get Gitlab contributions
	const res = await fetch(`https://gitlab.com/users/damienaries/calendar.json`);
	const calendar = await res.json();

	return {
		props: {
			projects,
			calendar
		}
	};
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
