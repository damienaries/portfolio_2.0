import styled from '@emotion/styled';
import { AiOutlineClose } from 'react-icons/ai';

function AboutModal({toggleAbout, aboutOpen}) {

  return aboutOpen && ( 
  <StyledAboutModal>
    <div className="about-modal">
      <AiOutlineClose className="close-icon" onClick={toggleAbout} />
      <StyledAbout id="about">
			<h3 className="section-title">Hi! I'm Damien</h3>
			<div className="flex-container">
				<div className="about-left">
					<p className="bio-content">
            Originally from France, I now live with my family in Los Angeles, CA.
            After a 15 year international career working in and running cocktail bars I decided to dive into my passion for all things tech and learned to code in 2020. My main focus is the Front End and I love to build beautiful, smooth interfaces and experiences in JavaScript, React and CSS.
            </p>
				</div>
				<div className="about-right">
					
				</div>
			</div>
		</StyledAbout>
    </div>
  </StyledAboutModal> 
  );
}

export default AboutModal;

const StyledAboutModal = styled.div`
position: fixed;
inset: 0;
height: 100vh;
max-height: 100vw;
z-index: 100;
display: flex;
align-items: center;
justify-content: center;
background: ${(props) => props.theme.overlay};

.about-modal {
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 2000;
height: 85vh;
max-height: 800px;
width: 75vw;
max-width: 1000px;
background: ${(props) => props.theme.background};
color: ${(props) => props.theme.text};
position: absolute;
border-radius: 3px;
background-image: linear-gradient(to bottom right, rgba(238, 238, 238, .5), rgba(238, 238, 238, .5)), url('assets/images/about-modal-bg.png');
background-position: right bottom;
background-repeat: no-repeat;
background-size: 60%;
}

.close-icon {
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 2rem;
  color: inherit;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.iconHover};
  }
}
`

const StyledAbout = styled.section`
	width: 100%;
	margin: 2rem auto 10rem;

	.flex-container {
		display: flex;
		justify-content: space-between;
		width: 80%;
		margin: 0 auto 2rem;
	}

	.section-title {
		font-size: var(--size-title-section);
		top: 1rem;
		text-align: left;
		margin-bottom: 4rem;
		font-weight: var(--weight-thin);
	}

	.about-left {
		flex: 2;
		font-size: var(--size-body);
		letter-spacing: 1.5px;
		margin-right: 2rem;
	}

	.about-right {
		flex: 1;

		.image-container {
			text-align: center;
		}

		.my-pic {
			max-width: 10rem;
			border-radius: var(--radius);
		}
	}

	@media screen and (max-width: 800px) {
		margin-bottom: 10rem;

		.about-left {
			padding: 0 2rem 2rem;
			margin-bottom: 5rem;
		}
	}

	@media screen and (max-width: 600px) {
		.flex-container {
			flex-direction: column;
		}

		.about-left {
			.bio-content {
				margin-bottom: 2rem;
			}
		}
	}
`;
