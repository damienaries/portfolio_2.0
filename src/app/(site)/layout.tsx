import Nav from '@/components/shell/Nav';
import Footer from '@/components/shell/Footer';

/**
 * The site shell.
 *
 * `(site)` is a route group — it doesn't appear in URLs, so /work stays /work.
 * Its only job is to hold the nav and footer, which means the landing (outside
 * this group) gets no shell without a single pathname check anywhere.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bloom relative isolate flex min-h-svh flex-col">
			<Nav />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
