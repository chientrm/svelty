import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (offset) => parseInt(offset) >= 0;
