import * as Cache from 'worktop/cfw.cache';
import type { Module } from 'worktop/cfw';
import type { Durable } from 'worktop/cfw.durable';

const worker: Module.Worker<{ ASSETS: Durable.Object }> = {
	async fetch(req, env, context) {
		const pragma = req.headers.get('cache-control') || '',
			res = !pragma.includes('no-cache') && (await Cache.lookup(req));
		if (res) {
			return res;
		}
		const { pathname } = new URL(req.url);
		if (pathname.startsWith('/_app')) {
			return env.ASSETS.fetch(req);
		}
	}
};
