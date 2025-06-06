import styled from '@emotion/styled';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
	return (
		<StyledLayout>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</StyledLayout>
	);
}

const StyledLayout = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	main {
		flex: 1;
	}
`;
