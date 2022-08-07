import type Root__SvelteComponent_ from './root.svelte';
import match from './match';

let root: Root__SvelteComponent_;

const forRoot = import('./root.svelte').then((m) => m.default),
	lazyLoaders: Record<string, () => Promise<any>[]> = {
		home: () => [import('./layout.svelte'), import('./home.svelte')],
		about: () => [import('./layout.svelte'), import('./about.svelte')],
		not_found: () => [import('./layout.svelte'), import('./404.svelte')]
	},
	data = JSON.parse(document.querySelector('script[data]').textContent),
	loadComponents = (pathname: string) => {
		const route = match(pathname),
			forModules = Promise.all(lazyLoaders[route]()),
			result = forModules.then((l) => l.map((i) => i.default));
		return result;
	},
	init = async ({ pathname }: { pathname: string }) => {
		const target = document.body,
			forComponents = loadComponents(pathname),
			[Root, components] = await Promise.all([forRoot, forComponents]);
		document.querySelector('style[data]')?.remove();
		document.querySelector('script[data]')?.remove();
		root = new Root({ target, props: { components, data }, hydrate: true });
	},
	route = async ({ pathname }: { pathname: string }) => {
		const components = await loadComponents(pathname);
		root.$set({ components });
	},
	find_anchor_tag = (element: HTMLElement): HTMLAnchorElement => {
		if (element.tagName === 'HTML') return undefined;
		if (element.tagName === 'A') return element as HTMLAnchorElement;
		return find_anchor_tag(element.parentElement);
	},
	{ pathname } = window.location;

init({ pathname });
window.addEventListener('click', (e) => {
	const a = find_anchor_tag(e.target as HTMLElement);
	if (a && !a.target) {
		e.preventDefault();
		const { pathname } = new URL(a.href);
		history.pushState({}, undefined, pathname);
		route({ pathname });
	}
});
window.addEventListener('popstate', () => route({ pathname }));
