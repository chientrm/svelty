import type { Module } from 'worktop/cfw';
import type { Durable } from 'worktop/cfw.durable';
import app from './app.html?raw';
import manifest from './dist/client/manifest.json';
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
				/* @ts-ignore */
				{ html, head, css } = root.render({ components });
			return new Response(
				app.replace('%head%', `${head}<style data>${css.code}</style>`).replace(
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
				{ headers: { 'content-type': 'text/html' } }
			);
		}
	}
};

export default worker;
