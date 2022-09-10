import { SECRET } from '$env/static/private';
import { Buffer } from 'buffer';
import { EncryptJWT, jwtDecrypt } from 'jose';

const check_ok = async (res: Response) => {
		if (!res.ok) {
			const { status, statusText, url } = res,
				text = await res.text();
			throw new Error(JSON.stringify({ status, statusText, url, text }));
		}
		return res;
	},
	key = Buffer.from(SECRET),
	encrypt = (data: any) =>
		new EncryptJWT(data)
			.setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
			.encrypt(key),
	decrypt = (jwe: string) => jwtDecrypt(jwe, key).then((res) => res.payload);

export { check_ok, encrypt, decrypt };
