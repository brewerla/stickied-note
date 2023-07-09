import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import {resolve} from 'path';

export default defineConfig({
	server: {
		port: 8000
	},
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$static: resolve('./static')
		}
	}
});
