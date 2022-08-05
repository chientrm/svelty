import type Root__SvelteComponent_ from './root.svelte';
import { match } from './routes';

let root: Root__SvelteComponent_;

const forRoot = import('./root.svelte').then((m) => m.default),
	lazyLoaders: Record<string, () => Promise<any>[]> = {
		home: () => [import('./layout.svelte'), import('./home.svelte')],
		about: () => [import('./layout.svelte'), import('./about.svelte')],
		not_found: () => [import('./layout.svelte'), import('./404.svelte')]
	},
	find_anchor_tag = (element: HTMLElement): HTMLAnchorElement => {
		if (element.tagName === 'HTML') return undefined;
		if (element.tagName === 'A') return element as HTMLAnchorElement;
		return find_anchor_tag(element.parentElement);
	},
	match_route = async ({ pathname }: { pathname: string }) => {
		const route = match(pathname),
			target = document.body,
			forModules = Promise.all(lazyLoaders[route]()),
			forComponents = forModules.then((l) => l.map((i) => i.default)),
			[Root, components] = await Promise.all([forRoot, forComponents]);
		document.querySelector('style[data]')?.remove();
		if (root) {
			root.$set({ components });
		} else {
			root = new Root({ target, props: { components }, hydrate: true });
		}
	},
	{ pathname } = window.location;

match_route({ pathname });
window.addEventListener('click', (e) => {
	const a = find_anchor_tag(e.target as HTMLElement);
	if (a && !a.target) {
		e.preventDefault();
		const { pathname } = new URL(a.href);
		history.pushState({}, undefined, pathname);
		match_route({ pathname });
	}
});
window.addEventListener('popstate', () => match_route({ pathname }));
