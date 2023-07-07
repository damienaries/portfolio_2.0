import styled from '@emotion/styled';
import groq from 'groq';
import Jobs from '../../components/Jobs';
import Project from '../../components/Project';
import SkillsBanner from '../../components/SkillsBanner';
import sanityClient from '../../lib/client';

/*
    TODO add date to project for sorting
    fix card size and scrolling grid
    bar exp in array and scroll horizontal, link to services -> consulting
*/

export default function Projects(props) {
	const { projects = [], technology = [], jobs = [] } = props;

	return (
		<StyledProjects>
			<section className="projects-container">
				<h3 className="section-title">Recent Projects</h3>
				<div className="projects-grid">
					{projects &&
						projects.map((project) => (
							<Project project={project} key={project._id} />
						))}
				</div>
			</section>
			<h3 className="section-title">Technologies I love to work with</h3>
			{technology && <SkillsBanner />}

			<section className="exp-container">
				<h3 className="section-title">Work Experience</h3>
				<Jobs jobs={jobs} />
			</section>
		</StyledProjects>
	);
}

export async function getStaticProps() {
	const projects = await sanityClient.fetch(groq`
        *[_type == "project"] | order(publishedAt desc)
      `);
	const technology = await sanityClient.fetch(groq`
        *[_type == "technology"]
      `);
	const jobs = await sanityClient.fetch(groq`
        *[_type == "job"] | order(from desc)
    `);

	return {
		props: {
			projects,
			technology,
			jobs,
		},
	};
}

const StyledProjects = styled.div`
	width: 100%;
	text-align: center;

	.section-title {
		font-size: var(--size-title-section);
		font-weight: var(--weight-thin);
		text-transform: capitalize;
		margin: 3rem auto 2rem;
	}

	.projects-container {
		width: 100%;
		max-width: 1400px;
		margin: 2rem auto;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, 1fr);
		overflow-x: scroll;
	}

	.exp-container {
		padding: 1rem;
		margin: 2rem auto 10rem;
	}

	@media only screen and (max-width: 600px) {
		.section-title {
			font-size: calc(var(--size-body) + 0.75rem);
		}

		.projects-grid {
			grid-template-columns: 1fr;
			grid-template-rows: auto;
		}
	}
`;
