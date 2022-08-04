import type { Module } from 'worktop/cfw';
import type { Durable } from 'worktop/cfw.durable';
import app from './app.html';
import manifest from './dist/manifest.json';
import sw from './sw.js';

const worker: Module.Worker<{ ASSETS: Durable.Object }> = {
	async fetch(req, env) {
		const { pathname } = new URL(req.url);
		if (pathname === '/sw.js') {
			return new Response(sw, {
				headers: { 'content-type': 'application/javascript' }
			});
		}
		if (pathname.startsWith('/assets')) {
			const res = await env.ASSETS.fetch(req);
			return res;
		} else {
			const { file } = manifest['routes/client.ts'];
			return new Response(
				app.replace('%head%', ``).replace(
					'%body%',
					`
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
