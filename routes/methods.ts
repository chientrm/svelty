type MaybePromise<T> = T | Promise<T>;

type Getters = Record<
	string,
	(params: { pathname: string }) => MaybePromise<Record<string, any>>
>;

export const getters: Getters = {
	home: ({ pathname }) => {
		return {
			name: 'Dua Lipa'
		};
	}
};
