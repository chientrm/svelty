import type { Plugin } from 'vite';

const result: Plugin = {
	name: 'kit',
	config: () => ({ appType: 'custom', base: '/' }),
	configureServer: (vite) => () => {
		vite.middlewares.use(async (req, res) => {
			const { render } = await vite.ssrLoadModule('./dev.ts');
			res.writeHead(200, { 'Content-Type': 'text/html' }),
				res.write(await render({ req, vite })),
				res.end();
		});
	}
};

export default result;
