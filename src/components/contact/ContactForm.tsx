'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

/**
 * Posts to a Google Apps Script web app.
 *
 * Apps Script can't answer a CORS preflight, so this must be a "simple" request
 * — text/plain, no custom headers. application/json fails with an opaque CORS
 * error. It also can't set status codes, so success is an `ok` flag in the body.
 */

const INQUIRIES = [
	{ value: 'product', label: 'Software / product engineering' },
	{ value: 'freelance', label: 'Website or app work' },
	{ value: 'beverage', label: 'Bar & beverage consulting' },
	{ value: 'other', label: 'Something else' },
] as const;

/** Placeholder changes with the enquiry type. */
const HINTS: Record<string, string> = {
	product: "Role, team, and what you're building.",
	freelance: 'What you need built, roughly when, and any budget range.',
	beverage:
		'Venue, what stage the programme is at, and what you need help with.',
	other: 'What you want to talk about.',
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

/* Public by design. Inlined at build time, so changing it needs a redeploy. */
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

		if (!ENDPOINT) {
			setStatus('error');
			setError(
				"The form isn't connected yet. Email damien@damienaries.com and I'll pick it up there.",
			);
			return;
		}

		const payload = Object.fromEntries(new FormData(e.currentTarget).entries());

		try {
			const res = await fetch(ENDPOINT, {
				method: 'POST',
				// CORS-safelisted, so no preflight — Apps Script can't answer one.
				headers: { 'Content-Type': 'text/plain;charset=utf-8' },
				body: JSON.stringify(payload),
			});
			const out = (await res.json()) as { ok?: boolean; error?: string };
			if (!out.ok) throw new Error(out.error ?? 'rejected');
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
			{/* sr-only, not display:none — some bots skip the latter. */}
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
				<Button
					type="submit"
					disabled={status === 'sending'}
					className="w-full sm:w-auto sm:self-start">
					{status === 'sending' ? 'Sending…' : 'Send'}
				</Button>

				<p aria-live="polite" className="text-sm text-muted">
					{error}
				</p>
			</div>
		</form>
	);
}
