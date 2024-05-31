/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/components/**/*.{js,vue,ts}",
		"./src/layouts/**/*.vue",
		"./src/pages/**/*.vue",
		"./src/plugins/**/*.{js,ts}",
		"./src/app.vue",
		"./src/error.vue",
	],
	theme: {
		extend: {
			boxShadow: {
				'rg': '0px 0px 38px -14px rgba(0,0,0,0.75)',
				'summary': '0px 10px 38px -14px rgba(0,0,0,0.75)'
			}
		},
	},
	plugins: [],
}