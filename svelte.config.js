import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

import { globSync } from 'glob';
import path from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

function overwolfFix(insideAdapter, options) {
	const name = 'overwolf-fix';
	return {
		name: insideAdapter ? `${name}, ${insideAdapter.name}` : name,
		async adapt(builder) {
			if (insideAdapter) {
				await insideAdapter.adapt(builder);
			}

			const mergedOptions = {
				pages: 'build',
				...options
			};

			globSync(`${path.join(mergedOptions.pages, builder.config.kit.appDir)}/**/*.js`, {}).forEach(
				(filePath) => {
					let js = readFileSync(filePath).toString();
					js = js.replace("if (params) {", "if (params|true) {")
					writeFileSync(filePath, js);
				}
			);
		}
	};
}

const config = {
	preprocess: vitePreprocess(),
	kit: {
		paths: {
			base: '',
			relative: true
		},
		adapter: overwolfFix(
			adapter({
				pages: 'build',
				assets: 'build',
				fallback: 'index.html',
				precompress: false,
				strict: true
			})
		)
	}
};

export default config;
