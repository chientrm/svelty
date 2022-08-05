import type { Module } from 'worktop/cfw';
import type { Durable } from 'worktop/cfw.durable';
import app from './app.html?raw';
import manifest from './dist/client/manifest.json';
import css from './dist/client/css.json';
import sw from './sw.js?raw';

import notFound from './routes/404.svelte';
import about from './routes/about.svelte';
import home from './routes/home.svelte';
import layout from './routes/layout.svelte';
import root from './routes/root.svelte';
import { match } from './routes/routes';

const routeComponents: Record<string, any[]> = {
	home: [layout, home],
	about: [layout, about],
	not_found: [layout, notFound]
};

const routeEntries: Record<string, string[]> = {
	home: ['routes/layout.svelte', 'routes/home.svelte'],
	about: ['routes/layout.svelte', 'routes/about.svelte'],
	notFound: ['routes/layout.svelte', 'routes/404.svelte']
};

const worker: Module.Worker<{ ASSETS: Durable.Object }> = {
	async fetch(req, env) {
		const { pathname } = new URL(req.url);
		if (pathname === '/sw.js') {
			return new Response(sw, {
				headers: { 'content-type': 'application/javascript' }
			});
		}
		if (pathname.startsWith('/assets')) {
			return env.ASSETS.fetch(req);
		} else {
			const { file } = manifest['routes/client.ts'],
				route = match(pathname),
				components = routeComponents[route],
				entries = routeEntries[route],
				styleEntries = entries.map((e) => manifest[e].css).flat(),
				styles = styleEntries.map((e) => css[e]),
				/* @ts-ignore */
				{ html, head } = root.render({ components }),
				result = new Response(
					app
						.replace('%head%', `${head}<style data>${styles.join('')}</style>`)
						.replace(
							'%body%',
							`
					${html}
					<script>
						window.addEventListener("load", () => {
							if ("serviceWorker" in navigator) {
								navigator.serviceWorker.register("/sw.js");
							}
						});
					</script>
					<script type="module" src="${file}"></script>
					`
						),
					{
						headers: {
							'content-type': 'text/html',
							'cache-control': 'no-cache'
						}
					}
				);
			return result;
		}
	}
};

export default worker;
