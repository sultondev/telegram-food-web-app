<script setup lang="ts">
import {maskNumber} from "~/utils";
import {useCartStore} from "~/store/cart-store";

type ProductItem = {
  id: number,
  name: string,
  category_id: number,
  created_at: Date | string,
  updated_at: Date | string,
  price: number,
  description: string,
  image: string
}
interface Props {
  product: ProductItem
}
interface Emits {
  (e: 'addOrder', value: ProductItem['id']): void
}
const { public: { baseURL } } = useRuntimeConfig()
const store = useCartStore()
const { cartSummaryPrice } = storeToRefs(store)

const props = defineProps<Props>()
const emits = defineEmits<Emits>()


const price = computed(() => maskNumber(props.product.price))
const counter = ref(0)

if(store.cartData[props.product.id]) {
  counter.value = store.cartData[props.product.id]
}
function increaseCart () {
  if(counter.value < 100) {
    counter.value = counter.value + 1
    store.addCart(props.product.id, counter.value)
    cartSummaryPrice.value += props.product.price
  }
}

function decreaseCart () {
  if(counter.value !== 0) {
    counter.value = counter.value - 1
    store.addCart(props.product.id, counter.value)
    cartSummaryPrice.value -= props.product.price
  }
}
</script>

<template>
  <div class="bg-gray-200 rounded-lg p-4 flex flex-col">
    <NuxtImg :src="baseURL+'/storage/'+product.image"
      class="w-full h-[120px] sm:h-[160px] md:h-[220px] lg:h-[240px] xl:h-[320px] mb-4 rounded-lg"
    />
    <p class="text-sm sm:text-lg flex-1 mb-4">
      {{product.name}}
    </p>
    <div v-if="counter > 0" class="flex bg-slate-300 py-1.5 rounded-md justify-between items-center px-4 gap-3 sm:gap-6">
      <Button :unstyled="true" class=""
        @click="decreaseCart"
      >
        <Icon name="ph:minus-bold" color="black" class="!p-0 w-[20px] h-[20px]" />
      </Button>
      <div class="text-sm">
        {{ counter  }}
      </div>
      <Button :unstyled="true" class=""
        @click="increaseCart"
      >
        <Icon name="ph:plus" color="black" class="!p-0 w-[20px] h-[20px]" />
      </Button>
    </div>
    <div v-else class="">
      <Button @click="increaseCart" :unstyled="true" class="bg-orange-400 text-white font-medium text-sm w-full py-2 rounded-md">
        UZS {{price}}
      </Button>

    </div>
  </div>
</template>