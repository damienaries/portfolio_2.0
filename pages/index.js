import styled from '@emotion/styled';
import Banner from '../components/Banner';

export default function Home(props) {
  const { projects = [] } = props;

	return (
		<HomePage>
			<Banner />
			{/* <Projects /> */}
		</HomePage>
	);
}

// export async function getStaticProps() {
// 	const projects = await sanityClient.fetch(groq`
//       *[_type == "project" && featured == true]
//     `);

// 	return {
// 		props: {
// 			projects,
// 		}
// 	};
// }

// Page Styles
const HomePage = styled.main`
	width: 100%;
	position: relative;
`;
