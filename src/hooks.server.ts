import { ENVIRONMENT, SECRET, SENTRY_DSN } from '$env/static/private';
import { decrypt } from '$lib/utils';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import Toucan from 'toucan-js';
import { get_user } from './lib/helpers/cookies';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies } = event,
		user_cookie = get_user(cookies);
	if (user_cookie) {
		const user = await decrypt(user_cookie);
		//@ts-ignore
		event.locals.user = user;
	}
	return resolve(event);
};

export const handleError: HandleServerError = ({ error, event }) => {
	console.log({ error });
	if (SENTRY_DSN?.length) {
		const { request } = event,
			sentry = new Toucan({
				dsn: SENTRY_DSN,
				request,
				allowedCookies: /(.*)/,
				allowedHeaders: /(.*)/,
				allowedSearchParams: /(.*)/,
				environment: ENVIRONMENT
			});
		sentry.setExtra('event', event);
		sentry.captureException(error);
	}
};
