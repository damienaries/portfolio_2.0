import styled from '@emotion/styled';
import About from '../components/ui/About';

export default function Home() {
	return (
		<HomePage>
			<About />
		</HomePage>
	);
}

// Page Styles
const HomePage = styled.main`
	width: 100%;
	position: relative;
`;
