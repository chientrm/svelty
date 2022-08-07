const routes: Record<string, RegExp> = {
	home: /^\/(data\.json)?$/,
	about: /^\/about$/,
	not_found: /.*/
};

export default (url: string) =>
	Object.entries(routes).find(([_, value]) => value.test(url))[0];
