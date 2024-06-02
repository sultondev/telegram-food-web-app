<script setup lang="ts">
import {useApiFetch} from "~/composables/useApiFetch";
import type {MenuListInterface} from "~/types/interfaces";
import type {ProductItem} from "~/types/types";
import SearchResultWrapper from "~/components/SearchResultWrapper.vue";
import {useCartStore} from "~/store/cart-store";

type RouteQueryData = {
  [key: string]: number
}

const config = useRuntimeConfig()
const store = useCartStore()
const { cartSummaryPrice, cartData } = storeToRefs(store)
const maskedSummary = computed(() => maskNumber(cartSummaryPrice.value))
const route = useRoute()

const { data } = await useApiFetch<MenuListInterface<ProductItem[]>[]>('/api/menu')
const menuList = ref(data.value)

const selectedBar = ref<number | null>(null)

if(data.value) {
  selectedBar.value = data.value[0].id
}

if(route?.query?.cart && route?.query?.cart.length > 4 && data.value) {
  const queryData = JSON.parse(route.query.cart as string)
  cartData.value = Object.assign({}, ...queryData)
  const routeSelectedCart = Object.keys(cartData.value).map(Number)
  const totalPrice = data.value.flatMap((item) => item.products).filter((item)=> {
    return routeSelectedCart.includes(item.id)
  }).reduce((accum, item, idx) => {
    accum += item.price * cartData.value[item.id]
    return accum
  }, 0)
  cartSummaryPrice.value = totalPrice
}

</script>

<template>
  <div class="pt-4 pb-12">
    <Container>
      <HeaderLogo class="mb-8" />
      <div class="mb-8">
        <NuxtImg src="/img/banner.webp" class="w-full rounded-lg" />
      </div>
      <SearchForm class="mb-12">
        <template v-slot="{ currentTab, searchWord }">
          <MenuList v-if="searchWord.length == 0" :menu-list="menuList" :active-tab="currentTab" />
          <SearchResultWrapper v-else :menu-list="menuList" :search-word="searchWord" />
        </template>
      </SearchForm>
    </Container>
      <div class="fixed flex bottom-0 bg-white shadow-summary py-4 px-6 rounded-t-2xl w-full">
        <div class="flex w-1/2 flex-col font-bold">
          <span class="">Общая сумма</span>
          <span class="text-orange-500">UZS {{maskedSummary}}</span>
        </div>
        <NuxtLink to="/confirm" :unstyled="true" class="w-1/2 bg-orange-400 text-white flex py-2 px-4 rounded-md cursor-pointer h-fit justify-center">
          Заказать
        </NuxtLink>
      </div>
  </div>
</template>