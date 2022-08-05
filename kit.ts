import type { Plugin } from 'vite';
import { writeFileSync } from 'fs';

const cssReg = /\.(css)$/;

export default () => {
	let ssr = false;
	const result: Plugin = {
		name: 'kit',
		config: (_, env) => {
			ssr = env.ssrBuild ?? false;
			return { appType: 'custom', base: '/' };
		},
		configureServer: (vite) => () => {
			vite.middlewares.use(async (req, res) => {
				const { render } = await vite.ssrLoadModule('./dev.ts');
				res.writeHead(200, { 'Content-Type': 'text/html' }),
					res.write(await render({ req, vite })),
					res.end();
			});
		},
		writeBundle: (_, bundle) => {
			if (!ssr) {
				const assets = {};
				for (const [name, value] of Object.entries(bundle)) {
					if (value.type === 'asset' && cssReg.test(name))
						assets[name] = value.source;
				}
				writeFileSync('dist/client/css.json', JSON.stringify(assets));
			}
		}
	};
	return result;
};
