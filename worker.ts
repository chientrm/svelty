import type { Module } from 'worktop/cfw';
import * as Cache from 'worktop/cfw.cache';
import type { Durable } from 'worktop/cfw.durable';
import app from './app.html';
import manifest from './dist/manifest.json';

const worker: Module.Worker<{ ASSETS: Durable.Object }> = {
	async fetch(req, env, context) {
		// const res = await Cache.lookup(req);
		// if (res) {
		// 	return res;
		// }
		const { pathname } = new URL(req.url);
		if (pathname.startsWith('/assets')) {
			const res = await env.ASSETS.fetch(req);
			return res;
			// cachedRes = new Response(res.body, {
			// 	headers: {
			// 		'cache-control': 'public, immutable, max-age=31536000',
			// 		'content-type': res.headers.get('content-type'),
			// 		'x-robots-tag': 'noindex'
			// 	}
			// });
			// return Cache.save(req, cachedRes, context);
		} else {
			const { file } = manifest['routes/client.ts'];
			return new Response(
				app
					.replace('%head%', ``)
					.replace('%body%', `<script type="module" src="${file}"></script>`),
				{ headers: { 'content-type': 'text/html' } }
			);
		}
	}
};

export default worker;
