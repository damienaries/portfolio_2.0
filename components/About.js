import styled from '@emotion/styled';
import Link from 'next/dist/client/link';

function AboutSection() {

  return ( 
  <StyledAboutSection>
    <div className="about-content">
			<h1 className="home-title">Welcome</h1>
			<div className="about-body">
				<p className="body-paragraph">
					Hi! I'm Damien. I'm a Full Stack developer in Los Angeles, CA. <br></br>I love writing JavaScript and PhP and specialize in React, Next.js, Vue &amp; Laravel.
				</p>
				<p className="body-paragraph">
					I'm a lifelong learner, passionate about all things Javascript, Climate Tech, Ed Tech and the possibilities of AI. Always looking to grow and improve, 
					I aspire to take part in building beautiful, fast, fun and exciting programs that will benefit us all. 
				</p>
				<p className="body-paragraph">
					Originally from France, I traveled around Europe and North America during the course of my previous career managing cocktail bars and currently live with my family in California.
				</p>
				<Link href="/projects">
					<button>Want to learn about my work?</button>
				</Link>
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
	margin: 6rem auto;
	width: 85vw;
	max-width: 1400px;
	height: 75%;
	background: ${(props) => props.theme.cardBackground};
	color: ${(props) => props.theme.text};
	border-radius:  var(--radius);
	box-shadow: var(--shadow-low);
	overflow: hidden;
	background-image: ${(props) => props.theme.backgroundGradient}, url('assets/images/about-bg-ext.webp');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	padding: 4rem;

	.home-title {
		font-size: var(--size-title-main);
    font-weight: var(--weight-thin);
    letter-spacing: .1rem;
		text-align: left;
	}

	.about-body {
    width: 55%;
		font-size: var(--size-body);

		.body-paragraph {
			margin: 2rem 0;
		}

    button { /* Tbd button to work page? */
      background-color: transparent;
      border: .5px solid ${(props) => props.theme.text};
      outline: transparent;
      color: ${(props) => props.theme.text};
      padding: .5rem 1rem;
      font-size: 1.4rem;
      border-radius: 20px;
      margin: 3rem 0 0;
      
      &:hover {
        outline: ${(props) => props.theme.text};
        cursor: pointer;
        background-color: ${(props) => props.theme.buttonBgHover}
      }
    }
	}

	@media screen and (max-width: 768px) {
			width: 90vw;
			height: auto;
			background-position: 90%;


		.about-body {
      width: 100%;
			padding: 3rem 1rem 50rem;
		}
	}
}
`
