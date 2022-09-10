export default {
	HOME: '/',
	REDIRECT: '/redirect',
	GITHUB: {
		AUTHORIZE: ({ client_id, scope }: { client_id: string; scope: string }) => {
			const url = new URL('https://github.com/login/oauth/authorize');
			url.searchParams.append('client_id', client_id);
			url.searchParams.append('scope', scope);
			return url.href;
		},
		ACCESS_TOKEN: ({
			client_id,
			client_secret,
			code
		}: {
			client_id: string;
			client_secret: string;
			code: string;
		}) => {
			const url = new URL('https://github.com/login/oauth/access_token');
			url.searchParams.append('client_id', client_id);
			url.searchParams.append('client_secret', client_secret);
			url.searchParams.append('code', code);
			return url.href;
		},
		USER: 'https://api.github.com/user',
		EMAILS: 'https://api.github.com/user/emails'
	},
	LOGIN: '/login',
	LOGOUT: '/logout',
	ROOM: {
		LIST: '/room',
		NEW: '/room/_new',
		GET: (name: string) => `/room/${name}`
	},
	NEW_ROOM: '/new_room'
};
