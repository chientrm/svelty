import type Root__SvelteComponent_ from './root.svelte';
import { match } from './routes';

type Start = (params: { target: HTMLElement; url: string }) => void;

let root: Root__SvelteComponent_;

export const forRoot = import('./root.svelte').then((m) => m.default);

const lazyLoaders: Record<string, () => Promise<any>[]> = {
	home: () => [import('./layout.svelte'), import('./home.svelte')],
	about: () => [import('./layout.svelte'), import('./about.svelte')],
	not_found: () => [import('./layout.svelte'), import('./404.svelte')]
};

const find_anchor_tag = (element: HTMLElement): HTMLAnchorElement => {
	if (element.tagName === 'HTML') return undefined;
	if (element.tagName === 'A') return element as HTMLAnchorElement;
	return find_anchor_tag(element.parentElement);
};

const match_route: Start = async ({ target, url }) => {
	const route = match(url),
		forModules = Promise.all(lazyLoaders[route].call(null)),
		forComponents = forModules.then((l) => l.map((i) => i.default)),
		[Root, components] = await Promise.all([forRoot, forComponents]);
	document.querySelector('style[data]')?.remove();
	if (root) {
		root.$set({ components });
	} else {
		root = new Root({ target, props: { components }, hydrate: true });
	}
};

export const start: Start = async ({ target, url }) => {
	match_route({ target, url });
	window.addEventListener('click', (e) => {
		const a = find_anchor_tag(e.target as HTMLElement);
		if (a && !a.target) {
			e.preventDefault();
			const { pathname: url } = new URL(a.href);
			history.pushState({}, undefined, url);
			match_route({ url, target });
		}
	});
	window.addEventListener('popstate', () =>
		match_route({ url: window.location.pathname, target })
	);
};

start({ target: document.body, url: window.location.pathname });
