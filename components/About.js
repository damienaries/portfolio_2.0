import styled from '@emotion/styled';
import Link from 'next/dist/client/link';

function AboutSection() {

  return ( 
  <StyledAboutSection>
    <div className="about-content">
			<h1 className="home-title">Welcome</h1>
			<div className="about-body">
				<p className="body-paragraph">
					Hi! I'm Damien. I'm a Full Stack Developer based in Los Angeles, CA. <br></br>I love writing JavaScript, PhP and CSS and specialize in Laravel, Vue, React &amp; Next.js.
				</p>
				<p className="body-paragraph">
					I'm a lifelong learner, passionate about all things Javascript, Climate, Education and the possibilities modern AI tech might bring to these fields. Always looking to grow and improve, I aspire to take part in building beautiful, fast, fun and exciting programs that will benefit us all. 
				</p>
				<p className="body-paragraph">
					Originally from France, I traveled around Europe and North America during the course of my previous career in the cocktail world. I currently live with my family in California and when I'm not coding you can find me on a hike or a bike ride by the beach, enjoying the best LA has to offer.
				</p>
				<Link href="/projects">
					<a className="work-cta">See some recent work</a>
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

    .work-cta {
      border: 1px solid ${(props) => props.theme.text};
      color: ${(props) => props.theme.text};
      padding: .5rem 1rem;
      font-size: 1.4rem;
      border-radius: 20px;
      margin: 4rem 0 0;
      
      &:hover,
			&:active {
        cursor: pointer;
				transform: scale(.99);
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
`
