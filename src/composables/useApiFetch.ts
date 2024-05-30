import type { UseFetchOptions } from 'nuxt/app'
// import { defu } from 'defu'

export async function useApiFetch<T>(url: string, options: UseFetchOptions<T> = {}) {
	const config = useRuntimeConfig()

	const defaults: UseFetchOptions<T> = {
		baseURL: config.public.baseURL,
		headers: {
			Accept: '*/*',
			'Accept-Encoding': 'gzip, deflate, br',
			Connection: 'keep-alive'
		},
		// cache request
		key: url,
		lazy: true,
		server: true,
	}


	// just merge, assign  options
	const params = defaults
	return useFetch(url, params);
}
