import styled from '@emotion/styled';
import groq from 'groq';
import { useEffect, useState } from 'react';
import Project from '../../components/Project';
import SkillsBanner from '../../components/SkillsBanner';
import sanityClient from '../../lib/client';

/*
    TODO
		work: blurb for previous bar exp with a couple of examples
		personal projects: site template?
*/

export default function Projects(props) {
	const { projects = [] } = props;
	const categories = ['work', 'freelance', 'personal'];
	const [currentTab, setCurrentTab] = useState('work');
	const [currentProjects, setCurrentProjects] = useState([]);

	useEffect(() => {
		//filter projects based on currentTab
		setCurrentProjects(projects.filter(p => p.category === currentTab))
	}, [currentTab])

	const handleClick = c => {
		setCurrentTab(c);
	}
	
	return (
		<StyledProjects>
			<SkillsBanner />
			<section className="projects-container">
				<h1 className="page-title">Recent Work</h1>
				<div className="tabs-container">
					<nav className="tabs-head">
						{categories.map(c => (
							<h2 onClick={() => handleClick(c)} className={"tab" + (currentTab === c? " current" : "")} key={c}>
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
		</StyledProjects>
	);
}

export async function getStaticProps() {
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

	return {
		props: {
			projects
		}
	};
}

const StyledProjects = styled.main`
	width: 100%;
	text-align: center;
	display: flex;

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

		@media only screen and (max-width: 600px){
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
			font-weight: var(--weight-bold)
		}

		&.current {
			font-weight: var(--weight-bold)
		}
	}

	.tabs-body {
		margin: 2rem auto;
	}
`;
