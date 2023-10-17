import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import { dark } from 'daisyui-ntsd';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [],
	theme: {
		extend: {}
	},
	plugins: [daisyui],
	daisyui: {
		styled: true,
		base: true,
		utils: true,
		logs: false,
		rtl: false,
		prefix: '',
		themes: [
			{
				dark: {
					...dark
				}
			}
		]
	}
} satisfies Config;
