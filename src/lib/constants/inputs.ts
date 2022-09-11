import * as yup from 'yup';

export default {
	NAME: {
		PATTERN: '[a-zA-A0-9-]+',
		TITLE: `a-z, A-Z, 0-9 and '-' only`
	},
	TEXT: {
		SCHEMA: yup.string().required().max(255)
	}
};
