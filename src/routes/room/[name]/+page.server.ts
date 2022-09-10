import type { PageServerLoad } from './$types';
import yup from 'yup';

export const load: PageServerLoad = async ({ params }) => {
	const { name } = params;
	await yup
		.object()
		.shape({
			name: yup
				.string()
				.required()
				.matches(/[a-zA-Z0-9-]{5,64}/g)
		})
		.validate({ name });
};
