const routes: Record<string, RegExp> = {
	home: /^\/$/,
	about: /^\/about$/,
	not_found: /.*/
};

export const match = (url: string) =>
	Object.entries(routes).find(([_, value]) => value.test(url))[0];
