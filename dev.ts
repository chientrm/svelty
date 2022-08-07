import type { Connect, ModuleNode, ViteDevServer } from 'vite';
import app from './app.html?raw';
import match from './routes/match';
import { getters } from './routes/methods';

const cssReg = /\.(css)$/;

type Render = (params: {
	req: Connect.IncomingMessage;
	vite: ViteDevServer;
	app: string;
}) => Promise<string>;

const paths = {
	root: '$routes/root.svelte',
	layout: '$routes/layout.svelte',
	home: '$routes/home.svelte',
	about: '$routes/about.svelte',
	not_found: '$routes/404.svelte'
};

const routePaths: Record<string, string[]> = {
	home: [paths.layout, paths.home],
	about: [paths.layout, paths.about],
	notFound: [paths.layout, paths.not_found]
};

export const render: Render = async ({ req, vite }) => {
	const { url: pathname } = req,
		ssrComp = (p: string) => vite.ssrLoadModule(p).then((m) => m.default),
		ssrCss = (n: ModuleNode) => (cssReg.test(n.url) ? ssrComp(n.url) : null),
		loadModule = async (p: string) => {
			const component = await ssrComp(p),
				node = await vite.moduleGraph.getModuleByUrl(p);
			return { component, node };
		},
		route = match(pathname),
		getter = getters[route],
		forData = getter ? getter({ pathname }) : {},
		forRoot = ssrComp(paths.root),
		forModules = Promise.all(routePaths[route].map(loadModule)),
		forNodes = forModules.then((l) => l.map((i) => i.node)),
		forComponents = forModules.then((l) => l.map((i) => i.component)),
		forStyles = forNodes.then((l) =>
			Promise.all(l.map((i) => [...i.importedModules].map(ssrCss)).flat())
		),
		forRendered = Promise.all([forRoot, forComponents, forData]).then(
			([root, components, data]) => [root.render({ components, data }), data]
		),
		[[{ html, head }, data], styles] = await Promise.all([
			forRendered,
			forStyles
		]),
		result = app
			.replace(
				'%head%',
				`
				${head}
				<style data>${styles.join('')}</style>
				<script type="application/json" data>${JSON.stringify(data)}</script>
			`
			)
			.replace(
				'%body%',
				`${html}<script type="module" src="routes/client.ts"></script>`
			);
	return result;
};
