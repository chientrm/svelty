import routes from '$lib/constants/routes';
import { clear_user } from '$lib/helpers/cookies';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	clear_user(cookies);
	throw redirect(303, routes.LOGIN);
};
