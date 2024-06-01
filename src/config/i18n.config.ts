import type {NuxtOptions} from "@nuxt/schema";
import type {LocaleObject} from "@nuxtjs/i18n";

import en from '../locales/en.json'
import ru from '../locales/ru.json'
import type {NuxtConfig} from "nuxt/config";

export const messages = { en, ru }

export const vueI18n= {
	legacy: false,
	globalInjection: true,
	locale: 'en',
	fallbackLocale: 'en',
	missingWarn: false,
	fallbackWarn: false,
	silentTranslationWarn: true,
	messages,
	pluralRules: {
		ru: function (choice: number, choicesLength: number) {
			if (choice === 0) {
				return 0
			}

			const teen = choice > 10 && choice < 20
			const endsWithOne = choice % 10 === 1

			if (choicesLength < 4) {
				return !teen && endsWithOne ? 1 : 2
			}
			if (!teen && endsWithOne) {
				return 1
			}
			if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
				return 2
			}

			return choicesLength < 4 ? 2 : 3
		},
	},
}

export const locales: LocaleObject[] = [
	{
		code: 'en',
		iso: 'en',
		file: 'en.json',
	},
	{
		code: 'ru',
		iso: 'ru',
		file: 'ru.json',
	},
]

export const configI18n: NuxtOptions['i18n'] = {
	locales,
	langDir: './locales',
	detectBrowserLanguage: false,
	skipSettingLocaleOnNavigate: false,
	types: 'composition',
	dynamicRouteParams: true,
	strategy: 'prefix_except_default',
	defaultLocale: 'en',
	debug: false,
	// vueI18n,
}
