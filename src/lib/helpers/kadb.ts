import { KADB } from '$env/static/private';
import { check_ok } from '$lib/utils';

const len = (s: string) => `0000${s.length}`.slice(-4),
	pad = (n: number) => `0000${n}`.slice(-4),
	encode = (value: string) => Buffer.from(value, 'utf-8').toString('base64'),
	decode = (value: string) => Buffer.from(value, 'base64').toString('utf-8'),
	get = async <T>({
		k,
		offset,
		n_items
	}: {
		k: string;
		offset: number;
		n_items: number;
	}) => {
		const key = encode(k),
			res = await fetch(
				`http://${KADB}/${len(key)}/${pad(offset)}/${pad(n_items)}/${key}`
			).then(check_ok),
			total = parseInt(res.headers.get('Kadb-n_items')!),
			text = await res.text(),
			items = text
				.split(';')
				.filter((item) => item.length)
				.map(decode)
				.map((item) => JSON.parse(item) as T);
		return { total, items };
	},
	put = async <T>(k: string, v: T) => {
		const key = encode(k),
			value = encode(JSON.stringify(v));
		await fetch(`http://${KADB}/${len(key)}/${len(value)}/${key}${value}`, {
			method: 'PUT'
		}).then(check_ok);
	},
	ROOM = 'room',
	room = (name: string) => ({
		get_messages: ({ offset, n_items }: { offset: number; n_items: number }) =>
			get<Svelty.Message>({ k: `${ROOM}_${name}`, offset, n_items }),
		put_message: (message: Svelty.Message) =>
			put<Svelty.Message>(`${ROOM}_${name}`, message)
	});

export { room };
