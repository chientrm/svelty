import type { Actions, PageServerLoad } from './$types';
import * as yup from 'yup';
import { room } from '$lib/helpers/kadb';
import inputs from '$lib/constants/inputs';

export const load: PageServerLoad = async ({ params }) => {
	const { name, _offset, _n_items } = params,
		offset = parseInt(_offset),
		n_items = parseInt(_n_items),
		messages = await room(name).get_messages({ offset, n_items });
	return { messages };
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const { name } = params,
			formData = await request.formData(),
			{ text } = await yup
				.object()
				.shape({ text: inputs.TEXT.SCHEMA })
				.validate({ text: formData.get('text') }),
			user = locals.user!;
		await room(name).put_message({ user, text });
	}
};
