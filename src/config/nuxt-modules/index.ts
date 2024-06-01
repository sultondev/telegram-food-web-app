import type {NuxtConfig} from "nuxt/config";
import {tailwindcss} from "./tailwindcss"
import {primeVue} from "./prime-vue";
import {i18n} from "~/config/nuxt-modules/i18n";

export const modules: NuxtConfig['modules'] = [
	tailwindcss,
	primeVue,
	// i18n,
	'@nuxt/image',
	'nuxt-icon',
	'@pinia/nuxt'
]