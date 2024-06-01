import type {NuxtConfig} from "nuxt/config";
import {scripts as noScripts} from "../seo/seo";
import {modules} from "./nuxt-modules"
import {css} from "./css";
export const config: NuxtConfig = {
	devtools: { enabled: true },
	srcDir: 'src/',

	app: {
		head: {
			script: [...noScripts]
		},
	},

	runtimeConfig: {
		public: {
			baseURL: process.env.BASE_URL || 'no',
			apiBase: process.env.BASE_URL || 'no'
		}
	},

	css,
	modules,
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
}