import type { ModuleOptions } from '@nuxtjs/tailwindcss'
import type { NuxtConfig } from 'nuxt/config'

export const tailwindsOptions: ModuleOptions = {
	cssPath: ['src/styles/main.css', { injectPosition: 'first' }],
	configPath: 'tailwind.config.ts',
	exposeConfig: {
		level: 2,
	},
	config: {},
	viewer: true,
	// disableHmrHotfix: false,
	quiet: false,
	editorSupport: false,
}

export const [tailwindcss]: NuxtConfig['modules'] = [
	['@nuxtjs/tailwindcss', tailwindsOptions],
]
