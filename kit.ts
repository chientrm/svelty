import { readFileSync } from 'fs';
import type { Plugin } from 'vite';

const result: Plugin = {
	name: 'kit',
	config: () => ({ appType: 'custom', base: '/' }),
	configureServer: (vite) => () => {
		vite.middlewares.use(async (req, res) => {
			const { url } = req,
				app = readFileSync('./index.html', 'utf-8'),
				{ render } = await vite.ssrLoadModule('./server.ts');
			res.writeHead(200, { 'Content-Type': 'text/html' }),
				res.write(await render({ url, vite, app })),
				res.end();
		});
	}
};

export default result;
