import styled from '@emotion/styled';
import groq from 'groq';
import Project from '../../components/Project';
import SkillsBanner from '../../components/SkillsBanner';
import sanityClient from '../../lib/client';

/*
    TODO add date to project for sorting
    bar exp in array and scroll horizontal, link to services -> consulting
		classify project per category, each category becomes a tab : Work, Freelance, Personal project
		work: ivisa, concept, blurb for previous bar exp with a couple of examples
		freelance: kyle and dad, sarah and judi
		personal projects: jamming, space tourism, cocktail app, site template?
*/

export default function Projects(props) {
	const { projects = []} = props;

	return (
		<StyledProjects>
			<SkillsBanner />
			<section className="projects-container">
				<h1 className="page-title">Recent Work</h1>
				<div className="projects-grid">
					{projects &&
						projects.map((project) => (
							<Project project={project} key={project._id} />
						))}
				</div>
			</section>
		</StyledProjects>
	);
}

export async function getStaticProps() {
	const projects = await sanityClient.fetch(groq`
        *[_type == "project"] | order(publishedAt desc)
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
		font-size: var(--size-title-section);
		font-weight: var(--weight-thin);
		text-transform: capitalize;
		margin: 3rem auto 2rem;
	}

	.projects-container {
		width: 100%;
		max-width: 1300px;
		margin: 2rem auto;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		overflow-x: scroll;
		align-content: center;
	}

	.exp-container {
		padding: 1rem;
		margin: 2rem auto 10rem;
	}

	@media only screen and (max-width: 600px) {
		.projects-grid {
			grid-template-columns: 1fr;
			grid-template-rows: auto;
		}
	}
`;
