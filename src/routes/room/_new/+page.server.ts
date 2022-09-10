import routes from '$lib/constants/routes';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData(),
			name = formData.get('name')! as string;
		throw redirect(303, routes.ROOM.GET(name));
	}
};
