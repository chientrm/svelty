export const rootPath = '$routes/root.svelte';

const paths = {
	layout: './routes/layout.svelte',
	home: './routes/home.svelte',
	about: './routes/about.svelte',
	notFound: './routes/404.svelte'
};

interface Route {
	match: RegExp;
	params: { name: string }[];
	paths: string[];
	loadComponents: () => Promise<any>[];
}

export const forRoot = import('./root.svelte').then((m) => m.default);

const result: Route[] = [
	{
		match: /^\/$/,
		params: [],
		paths: [paths.layout, paths.home],
		loadComponents: () => [import('./layout.svelte'), import('./home.svelte')]
	},
	{
		match: /^\/about$/,
		params: [],
		paths: [paths.layout, paths.about],
		loadComponents: () => [import('./layout.svelte'), import('./about.svelte')]
	}
];

const notFound: Route = {
	match: /.*/,
	params: [],
	paths: [paths.layout, paths.notFound],
	loadComponents: () => [import('./layout.svelte'), import('./404.svelte')]
};

export const match = (url: string) =>
	result.find((i) => url.match(i.match)) ?? notFound;
