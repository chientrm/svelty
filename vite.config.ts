import { defineConfig } from 'vite';
import kit from './kit';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [[...svelte({ compilerOptions: { hydratable: true } }), kit]],
	resolve: {
		alias: { $lib: '/lib', $routes: '/routes', $runtime: '/runtime' }
	}
});
