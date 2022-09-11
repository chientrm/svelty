import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (n_items) =>
	parseInt(n_items) > 0 && parseInt(n_items) <= 10;
