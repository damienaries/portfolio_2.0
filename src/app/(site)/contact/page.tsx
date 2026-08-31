import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
	title: 'Work with me',
	description:
		'Software and product engineering, website and app work, or bar and beverage consulting. Get in touch.',
};

export default function Contact() {
	return (
		<div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-14 pt-10">
			<header className="flex flex-col gap-4 pb-10">
				<h1 className="font-display text-2xl font-extrabold tracking-tight text-balance">
					Work with me
				</h1>
				<p className="max-w-[62ch] text-lg text-muted">
					Engineering roles, freelance builds, or a bar program, from concept to
					delivery. Tell me which and I&rsquo;ll get back to you.
				</p>
			</header>

			<ContactForm />
		</div>
	);
}
