import type { ModuleNode, ViteDevServer } from 'vite';
import { match, rootPath } from './routes';
import hash from '$lib/utils/hash';

const cssReg = /\.(css)$/;

type Render = (params: {
	url: string;
	vite: ViteDevServer;
	app: string;
}) => Promise<string>;

export const render: Render = async ({ url, vite, app }) => {
	const ssrComp = (p: string) => vite.ssrLoadModule(p).then((m) => m.default),
		ssrCss = (n: ModuleNode) => (cssReg.test(n.url) ? ssrComp(n.url) : null),
		loadModule = async (p: string) => {
			const component = await ssrComp(p),
				node = await vite.moduleGraph.getModuleByUrl(p);
			return { component, node };
		},
		route = match(url),
		forRoot = ssrComp(rootPath),
		forModules = Promise.all(route.paths.map(loadModule)),
		forNodes = forModules.then((l) => l.map((i) => i.node)),
		forComponents = forModules.then((l) => l.map((i) => i.component)),
		forStyles = forNodes.then((l) =>
			Promise.all(l.map((i) => [...i.importedModules].map(ssrCss)).flat())
		),
		forRendered = Promise.all([forRoot, forComponents]).then(
			([root, components]) => root.render({ components })
		),
		[{ html, head }, styles] = await Promise.all([forRendered, forStyles]),
		target = hash(html),
		result = app
			.replace('%head%', `${head}<style data>${styles.join('')}</style>`)
			.replace(
				'%body%',
				`
			${html}
			<script type="module" data-hydrate="${target}">
				import { start } from '/client.ts';
				start({
					target: document.querySelector('[data-hydrate="${target}"]').parentNode,
					url: ${JSON.stringify(url)}
				});
			</script>`
			);
	return result;
};

export const respond = render;
