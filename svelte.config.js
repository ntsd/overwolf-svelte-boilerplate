import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		paths: {
			base: '',
			relative: true
		},
		adapter: adapter({
			pages: 'build/Files',
			assets: 'build',
			fallback: 'test.html',
			precompress: false,
			strict: true
		})
	}
};

export default config;
