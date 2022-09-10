import routes from '$lib/constants/routes';
import strings from '$lib/constants/strings';
import { check_ok } from '$lib/utils';

const get_access_token = ({
		client_id,
		client_secret,
		code
	}: {
		client_id: string;
		client_secret: string;
		code: string;
	}) =>
		fetch(routes.GITHUB.ACCESS_TOKEN({ client_id, client_secret, code }), {
			headers: { Accept: 'application/json' }
		})
			.then(check_ok)
			.then((res) => res.json<{ access_token: string }>())
			.then((data) => data.access_token),
	f = (url: string, access_token: string) =>
		fetch(url, {
			headers: {
				Accept: 'application/vnd.github+json',
				'User-Agent': strings.SVELTY,
				Authorization: `token ${access_token}`
			}
		}).then(check_ok),
	get_user = (access_token: string) =>
		f(routes.GITHUB.USER, access_token).then((res) =>
			res.json<{
				id: number;
				login: string;
				html_url: string;
				name: string;
			}>()
		),
	get_email = (access_token: string) =>
		f(routes.GITHUB.EMAILS, access_token)
			.then((res) => res.json<{ email: string }[]>())
			.then((res) => res[0].email);

export { get_access_token, get_user, get_email };
