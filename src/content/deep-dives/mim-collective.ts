import type { DeepDive } from './types';

export const mimCollective: DeepDive = {
	slug: 'mim-collective',

	intro:
		'A website for an education initiative rethinking what middle school can be — built so the team could run it themselves once I handed it over.',

	sections: [
		{
			heading: 'The project',
			body: [
				'Made in the Middle Collective is an education initiative focused on helping young adolescents find their voice and rethinking what middle school can be. It grew out of the Leader Institute, whose site I built the year before.',
				'Working from a Figma design handed off to me, I built and launched their website, from the responsive pages to the contact form, content management system and final handoff.',
			],
		},
		{
			heading: 'More than a static website',
			body: [
				"One of the site's key features is **Bright Spots**, a collection of stories and examples highlighting what's working in middle school education.",
				'We initially planned to hardcode that content, but early in development I realized that would make every future update dependent on a developer. I suggested building a simple CMS instead, so the team could manage their own content.',
				'I used Firebase and Firestore to build an authenticated admin interface for adding and editing Bright Spots, migrated the existing content, and wrote the security rules that control who can change it.',
			],
		},
		{
			heading: 'Built to hand over',
			body: [
				"The goal wasn't just to deliver a finished website. It was to leave the team with something they could actually run themselves.",
				"That meant handling the less visible parts too: form submissions, deployment, content editing and documentation, plus a test suite and build-time link checks that run before every Netlify deploy. I also made sure the organization's accounts and data stayed under its ownership.",
				'The site launched in August 2026, with the CMS and final handoff completed afterward.',
				"It's one of my more complete freelance projects, and a good example of the kind of work I enjoy: building the product, spotting problems before they become maintenance headaches, and making sure the people using it aren't dependent on me afterward.",
			],
		},
	],
};
