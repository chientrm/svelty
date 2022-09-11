import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (name) =>
	name !== 'new' && /[a-zA-Z0-9-]{1,64}/g.test(name);
