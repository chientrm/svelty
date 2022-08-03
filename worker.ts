import type { Module } from 'worktop/cfw';
import * as Cache from 'worktop/cfw.cache';
import type { Durable } from 'worktop/cfw.durable';
import app from './app.html';
import manifest from './dist/manifest.json';

const worker: Module.Worker<{ ASSETS: Durable.Object }> = {
	async fetch(req, env) {
		const res = await Cache.lookup(req);
		if (res) {
			return res;
		}
		const { pathname } = new URL(req.url);
		if (pathname.startsWith('assets')) {
			return env.ASSETS.fetch(req);
		} else {
			const { file } = manifest['routes/client.ts'];
			return new Response(
				app
					.replace('%head%', ``)
					.replace('%body%', `<script type="module" src="${file}"></script>`)
			);
		}
	}
};

export default worker;
