<script setup lang="ts">
import {useApiFetch} from "~/composables/useApiFetch";
import type {MenuListInterface} from "~/types/interfaces";
import type {ProductItem} from "~/types/types";
import SearchResultWrapper from "~/components/SearchResultWrapper.vue";
import {useCartStore} from "~/store/cart-store";
import {maskNumber} from "~/utils";

const config = useRuntimeConfig()
const store = useCartStore()
const { cartSummaryPrice, cartData } = storeToRefs(store)
const maskedSummary = computed(() => maskNumber(cartSummaryPrice.value))

const { data } = await useApiFetch<MenuListInterface<ProductItem>[]>('/api/menu')
const menuList = ref(data.value)

const selectedBar = ref<number | null>(null)
const visible = ref(false)
if(data.value) {
  selectedBar.value = data.value[0].id
}

function sendOrder () {
  const cartKeys = Object.keys(cartData.value).map((item) => {
    const instance = {[item]: cartData.value[item]}
    if(instance[item] !== 0) {
      return instance
    }
  }).filter(item => item !== undefined)

  console.log({
    chatId: window?.Telegram?.WebApp?.initDataUnsafe?.user?.id || null,
    cart: cartKeys
  })
  visible.value = true
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
        <Button @click="visible = true" :unstyled="true" class="w-1/2 bg-orange-400 text-white flex py-2 px-4 rounded-md cursor-pointer h-fit justify-center">
          Заказать
        </Button>
      </div>

      <div class="card flex justify-content-center">
        <Dialog v-model:visible="visible" modal header="Окно" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <p class="mb-5">
            Вы подтверждаете что хотите заказать?
          </p>
          <Button @click="sendOrder" :unstyled="true" class="w-full bg-orange-400 text-white flex py-2 px-4 rounded-md cursor-pointer h-fit justify-center">
            Заказать
          </Button>
        </Dialog>
      </div>
  </div>
</template>