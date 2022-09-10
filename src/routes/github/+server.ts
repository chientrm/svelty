import { GITHUB_CLIENT_SECRET } from '$env/static/private';
import { PUBLIC_GITHUB_CLIENT_ID } from '$env/static/public';
import routes from '$lib/constants/routes';
import { set_user } from '$lib/helpers/cookies';
import { get_access_token, get_email, get_user } from '$lib/helpers/github';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	if (code) {
		const access_token = await get_access_token({
				code,
				client_id: PUBLIC_GITHUB_CLIENT_ID,
				client_secret: GITHUB_CLIENT_SECRET
			}),
			user: Svelty.User = await Promise.all([
				get_user(access_token),
				get_email(access_token)
			]).then(([{ id, login, html_url, name }, email]) => ({
				github: { id, login, html_url, name, email }
			}));
		await set_user(cookies, user);
		throw redirect(303, routes.REDIRECT);
	}
	throw redirect(303, routes.HOME);
};
