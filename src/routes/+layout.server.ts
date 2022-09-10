import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => ({
	user: locals.user && {
		github: locals.user.github && {
			...locals.user.github,
			access_token: undefined
		}
	}
});
