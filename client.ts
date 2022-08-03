import type Root__SvelteComponent_ from '$routes/root.svelte';
import { forRoot, match } from './routes';

type Start = (params: { target: HTMLElement; url: string }) => void;

let root: Root__SvelteComponent_;

const find_anchor_tag = (element: HTMLElement): HTMLAnchorElement => {
	if (element.tagName === 'HTML') return undefined;
	if (element.tagName === 'A') return element as HTMLAnchorElement;
	return find_anchor_tag(element.parentElement);
};

const match_route: Start = async ({ target, url }) => {
	const route = match(url),
		forModules = Promise.all(route.loadComponents()),
		forComponents = forModules.then((l) => l.map((i) => i.default)),
		forHydrate = Promise.all([forRoot, forComponents]);
	const [Root, components] = await forHydrate;
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
