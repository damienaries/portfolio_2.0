'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

/**
 * Posts to a Google Apps Script web app, which writes to a Sheet and emails.
 * Setup and the script itself: docs/contact-apps-script.md
 *
 * The request shape is dictated by Apps Script, which cannot answer a CORS
 * preflight. So this sends a "simple" request — text/plain content type, no
 * custom headers, JSON in the body — which the spec exempts from preflight.
 * Using application/json here would fail with an opaque CORS error.
 *
 * Apps Script also can't set HTTP status codes on a ContentService response, so
 * every reply is 200 and correctness lives in an `ok` flag in the body.
 */

const INQUIRIES = [
	{ value: 'product', label: 'Software / product engineering' },
	{ value: 'freelance', label: 'Website or app work' },
	{ value: 'beverage', label: 'Bar & beverage consulting' },
	{ value: 'other', label: 'Something else' },
] as const;

/** The one thing worth knowing changes with the enquiry. */
const HINTS: Record<string, string> = {
	product: "Role, team, and what you're building.",
	freelance: 'What you need built, roughly when, and any budget range.',
	beverage:
		'Venue, what stage the programme is at, and what you need help with.',
	other: 'What you want to talk about.',
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

/* Public by design — anyone can POST to it, which is what the honeypot and the
   script's required-field check are for. Inlined at build time, so changing it
   needs a redeploy. */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

const field =
	'w-full rounded-(--radius-sm) border border-line bg-surface px-3 py-2.5 ' +
	'text-base text-ink placeholder:text-muted ' +
	'focus:border-jade focus:outline-none';

const label = 'font-mono text-label tracking-widest uppercase text-muted';

export default function ContactForm() {
	const [status, setStatus] = useState<Status>('idle');
	const [inquiry, setInquiry] = useState<string>('product');
	const [error, setError] = useState<string | null>(null);

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setStatus('sending');
		setError(null);

		const data = new FormData(e.currentTarget);
		data.set('form-name', 'contact');

		try {
			const res = await fetch('/__forms.html', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(
					data as unknown as Record<string, string>,
				).toString(),
			});
			if (!res.ok) throw new Error(`${res.status}`);
			setStatus('sent');
		} catch {
			setStatus('error');
			setError(
				"That didn't send. Email damien@damienaries.com directly and I'll pick it up there.",
			);
		}
	}

	if (status === 'sent') {
		return (
			<div className="glass max-w-xl p-6" role="status" aria-live="polite">
				<p className="font-display text-lg font-bold text-ink">
					Got it — thank you.
				</p>
				<p className="mt-2 text-muted">
					I read everything that comes through here and usually reply within a
					couple of days.
				</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={onSubmit}
			className="flex max-w-xl flex-col gap-5"
			noValidate={false}>
			{/* sr-only clips the honeypot rather than display:none, which some bots
			    detect and skip. The script reports success but writes nothing when
			    it's filled. */}
			<p className="sr-only" aria-hidden="true">
				<label>
					Don&rsquo;t fill this in
					<input
						type="text"
						name="bot-field"
						tabIndex={-1}
						autoComplete="off"
					/>
				</label>
			</p>

			<div className="flex flex-col gap-2">
				<label htmlFor="inquiry" className={label}>
					What&rsquo;s this about?
				</label>
				<select
					id="inquiry"
					name="inquiry"
					value={inquiry}
					onChange={(e) => setInquiry(e.target.value)}
					className={field}>
					{INQUIRIES.map((o) => (
						<option key={o.value} value={o.label}>
							{o.label}
						</option>
					))}
				</select>
			</div>

			<div className="grid gap-5 sm:grid-cols-2">
				<div className="flex flex-col gap-2">
					<label htmlFor="name" className={label}>
						Name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						autoComplete="name"
						className={field}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="email" className={label}>
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						autoComplete="email"
						className={field}
					/>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="company" className={label}>
					Company{' '}
					<span className="normal-case tracking-normal">(optional)</span>
				</label>
				<input
					id="company"
					name="company"
					type="text"
					autoComplete="organization"
					className={field}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="message" className={label}>
					Message
				</label>
				<textarea
					id="message"
					name="message"
					required
					rows={6}
					placeholder={
						HINTS[INQUIRIES.find((o) => o.label === inquiry)?.value ?? 'other']
					}
					className={field + ' resize-y'}
				/>
			</div>

			<div className="flex flex-wrap items-center gap-4">
				<Button type="submit" disabled={status === 'sending'} className="self-start">
					{status === 'sending' ? 'Sending…' : 'Send'}
				</Button>

				<p aria-live="polite" className="text-sm text-muted">
					{error}
				</p>
			</div>
		</form>
	);
}
