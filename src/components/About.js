import styled from '@emotion/styled';
import Link from 'next/dist/client/link';

function AboutSection() {
	return (
		<StyledAboutSection>
			<div className="about-content">
				<h1 className="home-title">Welcome</h1>
				<div className="about-body">
					<p className="body-paragraph">
						Hi! I'm Damien, a Full Stack Developer based in Los Angeles, CA. I
						specialize in JavaScript, PHP, and CSS with deep expertise in
						Laravel, Vue, React, and Next.js frameworks.
					</p>
					<p className="body-paragraph">
						As a lifelong learner, I'm passionate about leveraging modern web
						technologies to create meaningful solutions in climate, education,
						and AI innovation. I'm driven to build beautiful, performant
						applications that make a real impact—combining technical excellence
						with user-focused design.
					</p>
					<p className="body-paragraph">
						My background includes international experience across Europe and
						North America, where I developed strong problem-solving skills and
						cultural adaptability in the hospitality industry before
						transitioning to tech. Now based in California with my family, I
						bring that same attention to detail and client-focused approach to
						every development project.
					</p>
					<p className="body-paragraph">
						When I'm not coding, you'll find me exploring LA's trails and
						beaches—always seeking that perfect balance between innovation and
						inspiration.
					</p>
					<Link href="/projects" className="work-cta">
						See some recent work
					</Link>
				</div>
			</div>
		</StyledAboutSection>
	);
}

export default AboutSection;

const StyledAboutSection = styled.section`
	min-height: calc(100vh - 60px);
	display: flex;
	align-items: start;
	justify-content: center;
	background: ${(props) => props.theme.background};

	.about-content {
		margin: 6rem auto;
		width: 80vw;
		max-width: 1400px;
		min-height: 80vh;
		background: ${(props) => props.theme.cardBackground};
		color: ${(props) => props.theme.text};
		border-radius: var(--radius);
		box-shadow: ${(props) => props.theme.boxShadow};
		overflow: hidden;
		background-color: ${(props) => props.theme.cardBackground};
		background-image: ${(props) => props.theme.backgroundGradient};
		padding: 4rem;

		.home-title {
			font-size: var(--size-title-main);
			font-weight: var(--weight-thin);
			letter-spacing: 0.1rem;
			text-align: left;
		}

		.about-body {
			width: 55%;
			font-size: var(--size-body);

			.body-paragraph {
				margin: 2rem 0;
			}

			.work-cta {
				border: 1px solid ${(props) => props.theme.borderColor};
				color: ${(props) => props.theme.text};
				padding: 1rem 1.5rem;
				font-size: 1.4rem;
				border-radius: 20px;
				margin: 4rem 0 0;
				box-shadow: ${(props) => props.theme.boxShadow};

				&:hover,
				&:active {
					cursor: pointer;
					transform: scale(0.99);
				}
			}
		}

		@media screen and (max-width: 768px) {
			width: 90vw;
			min-height: 100vh;
			background-position: 85%;
			padding: 2rem 1rem;

			.about-body {
				width: 100%;
				padding: 3rem 1rem;
			}
		}
	}
`;
