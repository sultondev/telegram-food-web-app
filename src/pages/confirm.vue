<script setup lang="ts">
import {useApiFetch} from "~/composables/useApiFetch";
import {useCartStore} from "~/store/cart-store";
import type {MenuListInterface} from "~/types/interfaces";
import type {ProductItem} from "~/types/types";

const confirmed = ref(false)
const visible = ref(false)
const { data } = await useApiFetch<MenuListInterface<ProductItem[]>[]>('/api/menu')
const menuList = ref(data.value||[])

const store = useCartStore()
const { cartSummaryPrice, cartData } = storeToRefs(store)
const maskedSummary = computed(() => maskNumber(cartSummaryPrice.value))

const selectedCarts = computed(() => {
  return Object.keys(cartData.value).map(Number)
})
const cartSendData = computed(() => {
  return selectedCarts.value.map((item) => {
    const instance = {[item]: cartData.value[item]}
    if(instance[item] !== 0) {
      return instance
    }
  }).filter(item => item !== undefined)
})

const body = computed(() => {
  return {
    chatId: window?.Telegram?.WebApp?.initDataUnsafe?.user?.id || null,
    cart: cartSendData.value
  }
})
const paymentType = ref('cash')
async function sendOrder () {
  // const { data } = await useApiFetch<any>('/api/cart', {
  //   method: 'POST',
  //   body
  // })
  visible.value = true

  setTimeout(() => {
    window.Telegram.WebApp.sendData(JSON.stringify(cartSendData.value));
  },2000)
}

const closeModal = () => {
    store.resetAll()
    navigateTo('/')
}

const products = computed(() => {
  return menuList.value.filter((item) => {
    return item.products.some(subItem => selectedCarts.value.includes(subItem.id))
  }).flatMap((item) => {
    return item.products
  }).filter((item) => {
    return selectedCarts.value.includes(item.id) && cartData.value[item.id] > 0
  })
})

</script>

<template>
  <div class="pt-4 pb-12">
    <Container class="">
        <div class="">
          <HeaderLogo class="mb-8" />

          <div v-if="products.length > 0" class="">
            <div class="mb-10">
              <h1 class="text-xl mb-4 text-orange-400">
                Оплатить удобным для вам способом
              </h1>
              <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <MenuListItem v-for="item in products" :key="item.id+'23Udasb'" :product="item" />
              </div>
            </div>
            <div class="flex flex-wrap gap-3">
                <div class="flex align-items-center">
                  <RadioButton v-model="paymentType" inputId="paymentType2" name="Наличные" value="cash" />
                  <label for="paymentType2" class="ml-2">Наличные</label>
                </div>

                <div class="flex align-items-center">
                  <RadioButton v-model="paymentType"  inputId="paymentType1" name="Пластиковое карта" value="card" />
                  <label for="paymentType1" class="ml-2">Пластиковое карта</label>
                </div>

            </div>
            <p class="mb-5">
              Вы подтверждаете что хотите заказать?
            </p>
            <Button @click="sendOrder" :unstyled="true" class="w-full bg-orange-400 text-white flex py-2 px-4 rounded-md cursor-pointer h-fit justify-center">
              Подтвердить
            </Button>
          </div>
          <div v-else class="">
            Нет закзов
            <NuxtLink to="/" :unstyled="true" class="w-full bg-orange-400 text-white flex py-2 px-4 rounded-md cursor-pointer h-fit justify-center">
              Вернуться что бы заказать
            </NuxtLink>
          </div>
        </div>

      <Dialog v-model:visible="visible" modal :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <template #header>
        <NuxtImg src="/img/complete.webp" class="w-[40px] h-[40px]"  />
        </template>
        <div class='completeText'>
          <p class="mb-2">Спасибо за заказ!🤗</p>
          <p class="mb-2">Оператор свяжется с вами для подтверждения заказа.</p>
          <Button
              @click="closeModal"
              :unstyled="true"
            class="w-full bg-orange-400 text-white flex py-2 px-4 rounded-md cursor-pointer h-fit justify-center">
          OK
          </Button>
        </div>
      </Dialog>
    </Container>
  </div>
</template>