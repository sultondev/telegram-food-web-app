import type {NuxtConfig} from "nuxt/config";

const primeVueOptions: NuxtConfig['primevue'] = {

}


export const [primeVue]: NuxtConfig['modules'] = [
	['nuxt-primevue', primeVueOptions]
]