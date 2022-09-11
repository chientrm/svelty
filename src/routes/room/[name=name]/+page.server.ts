import routes from '$lib/constants/routes';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const { name } = params;
	throw redirect(303, routes.ROOM.NAME(name).OFFSET(0).N_ITEMS(10));
};
