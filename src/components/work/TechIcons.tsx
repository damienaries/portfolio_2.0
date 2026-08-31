import type { IconType } from 'react-icons';
import {
	SiCss3,
	SiFirebase,
	SiJavascript,
	SiLaravel,
	SiNextdotjs,
	SiNodedotjs,
	SiNpm,
	SiNuxtdotjs,
	SiPhp,
	SiReact,
	SiRedux,
	SiShopify,
	SiTailwindcss,
	SiTypescript,
	SiVuedotjs,
} from 'react-icons/si';
import { FaDatabase, FaNetworkWired } from 'react-icons/fa';

/**
 * Icons rather than names — the stack is texture, not the point. Names still
 * reach assistive tech via aria-label/title.
 *
 * Keys are normalised because the data has drifted: "Typescript" and
 * "TypeScript", "npm" and "Npm" all appear.
 */

const ICONS: Record<string, IconType> = {
	css: SiCss3,
	dexie: FaDatabase,
	firebase: SiFirebase,
	javascript: SiJavascript,
	laravel: SiLaravel,
	nextjs: SiNextdotjs,
	nodejs: SiNodedotjs,
	npm: SiNpm,
	nuxt: SiNuxtdotjs,
	nuxtjs: SiNuxtdotjs,
	php: SiPhp,
	react: SiReact,
	redux: SiRedux,
	shopify: SiShopify,
	tailwindcss: SiTailwindcss,
	tailwind: SiTailwindcss,
	typescript: SiTypescript,
	vue: SiVuedotjs,
	vuejs: SiVuedotjs,
	websockets: FaNetworkWired,
};

const normalise = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

export default function TechIcons({ technologies }: { technologies?: string[] }) {
	if (!technologies?.length) return null;

	return (
		<ul className="flex flex-wrap items-center gap-2.5">
			{technologies.map((tech) => {
				const Icon = ICONS[normalise(tech)];
				return (
					<li key={tech} className="flex items-center">
						{Icon ? (
							<Icon
								role="img"
								aria-label={tech}
								title={tech}
								className="size-4 text-muted transition-colors duration-(--dur-fast)
								           group-hover:text-ink"
							/>
						) : (
							// Unmapped: show the name rather than hiding it.
							<span className="font-mono text-xs text-muted">{tech}</span>
						)}
					</li>
				);
			})}
		</ul>
	);
}
