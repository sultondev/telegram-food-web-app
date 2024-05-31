
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
import {defineStore} from "pinia";

export const useCartStore = defineStore('cart', () => {
	const cartData = ref<any>({})
	const cartSummaryPrice = ref(0)
	function addCart(field: number, count: number) {
		cartData.value[field] = count
	}

	return {
		cartData,
		addCart,
		cartSummaryPrice
	}
})