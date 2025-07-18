import styled from '@emotion/styled';
import ButtonComponent from './ButtonComponent';

function AboutSection() {
	return (
		<StyledAboutSection>
			<div className="about-content">
				<h1 className="home-title">Welcome</h1>
				<div className="about-body">
					<p>
						Hi! I'm Damien, a Full Stack Developer based in Los Angeles, CA. I
						specialize in JavaScript, PHP, and CSS with deep expertise in
						Laravel, Vue, React, and Next.js frameworks.
					</p>
					<p>
						As a lifelong learner, I'm passionate about leveraging modern web
						technologies to create meaningful solutions in climate, education,
						and AI innovation. I'm driven to build beautiful, performant
						applications that make a real impact—combining technical excellence
						with user-focused design.
					</p>
					<p>
						My background includes international experience across Europe and
						North America, where I developed strong problem-solving skills and
						cultural adaptability in the hospitality industry before
						transitioning to tech. Now based in California with my family, I
						bring that same attention to detail and client-focused approach to
						every development project.
					</p>
					<p>
						When I'm not coding, you'll find me exploring LA's trails and
						beaches—always seeking that perfect balance between innovation and
						inspiration.
					</p>
					<ButtonComponent href="/projects" icon="arrow-right">
						See some recent work
					</ButtonComponent>
				</div>
			</div>
		</StyledAboutSection>
	);
}

export default AboutSection;

const StyledAboutSection = styled.section`
	height: calc(100vh - 60px);
	display: flex;
	align-items: start;
	justify-content: center;
	background: ${(props) => props.theme.background};

	.about-content {
		margin: 3rem auto;
		width: 80vw;
		max-width: 1400px;
		background: ${(props) => props.theme.cardBackground};
		color: ${(props) => props.theme.text};
		border-radius: var(--radius);
		box-shadow: ${(props) => props.theme.boxShadow};
		overflow: hidden;
		background-color: ${(props) => props.theme.cardBackground};
		background-image: ${(props) => props.theme.backgroundGradient};
		padding: 2rem 4rem;

		.home-title {
			font-size: var(--text-xxl);
			text-align: left;
			font-weight: var(--font-weight-thin);
		}

		.about-body {
			width: 55%;

			p {
				margin: 2rem 0;
			}
		}

		@media screen and (max-width: 768px) {
			width: 90vw;
			min-height: 100vh;
			background-position: 85%;
			padding: 1rem;
			margin: 2rem auto;

			.about-body {
				width: 100%;
			}
		}
	}
`;
