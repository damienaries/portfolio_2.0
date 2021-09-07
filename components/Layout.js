import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
    const router = useRouter();
    const pageTitle = router.pathname === '/' ? 'HOME' : router.pathname.substring(1).toUpperCase();

    return (
        <>  
            <Head>
                <title>Damien Aries | {pageTitle}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            {children}
            <Footer />
        </>
    )
};

export default Layout;
