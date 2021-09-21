import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import Background from './Background';
import styled from '@emotion/styled';


const Layout = ({ children }) => {
    const router = useRouter();
    const pageTitle = router.pathname === '/' ? 'Welcome' : router.pathname.substring(1).toUpperCase();

    return (
        <StyledLayout>  
            <Head>
                <title>Damien Aries | {pageTitle}</title>
                <meta name="viewport" lang="eng" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Background />
            <Navbar />
            {children}
            <Footer />
        </StyledLayout>
    )
};

const StyledLayout = styled.div`
    position: relative;
    background-image: linear-gradient(
			to bottom right,
			var(--color-blue-light),
			var(--color-blue)
		);
`

export default Layout;
