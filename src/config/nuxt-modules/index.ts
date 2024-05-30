import type {NuxtConfig} from "nuxt/config";
import {tailwindcss} from "./tailwindcss"
import {primeVue} from "./prime-vue";

export const modules: NuxtConfig['modules'] = [
	tailwindcss,
	primeVue
]