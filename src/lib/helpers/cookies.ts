import { encrypt } from '$lib/utils';
import type { Cookies } from '@sveltejs/kit';

const USER = 'user',
	set = ({
		cookies,
		name,
		value
	}: {
		cookies: Cookies;
		name: string;
		value: string;
	}) =>
		cookies.set(name, value, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true
		}),
	get_cookie = ({ cookies, name }: { cookies: Cookies; name: string }) =>
		cookies.get(name),
	get_user = (cookies: Cookies) => get_cookie({ cookies, name: USER }),
	set_user = async (cookies: Cookies, user: Svelty.User) =>
		set({ cookies, name: USER, value: await encrypt(user) }),
	clear_user = (cookies: Cookies) => set({ cookies, name: USER, value: '' });

export { get_user, set_user, clear_user };
