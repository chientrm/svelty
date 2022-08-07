import { defineConfig } from 'vite';
import kit from './kit';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';

export default defineConfig({
	plugins: [
		[
			...svelte({
				compilerOptions: { hydratable: true },
				preprocess: [preprocess()]
			}),
			kit()
		]
	],
	resolve: {
		alias: { $lib: '/lib', $routes: '/routes', $runtime: '/runtime' }
	},
	build: { manifest: true, rollupOptions: { input: 'routes/client.ts' } }
});
