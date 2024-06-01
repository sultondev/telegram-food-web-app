import type {NuxtConfig} from "nuxt/config";
import type {} from "@nuxtjs/i18n";
import type {NuxtOptions} from "@nuxt/schema";
import {configI18n} from "~/config/i18n.config";

const i18nOptions: NuxtOptions['i18n'] = {
	vueI18n: './config/i18n.config.ts'
}
export const [i18n]: NuxtConfig['modules'] = [
	['@nuxt/i18n', configI18n]
]