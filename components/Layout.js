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
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Background />
            <Navbar />
            {children}
            <Footer />
        </StyledLayout>
    )
};

const StyledLayout = styled.body`
    position: relative;

    .bg-image {
        position: absolute;
        z-index: -1;
        height: 100%;
    }

`

export default Layout;
