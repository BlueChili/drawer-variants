/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [],
	safelist: [
		'overflow-hidden',
		{ pattern: /bg-black-.+/ },
		{ pattern: /bg-white-.+/ },
	],
}
