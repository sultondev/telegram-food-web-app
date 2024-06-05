<script setup lang="ts">

import type {MenuListInterface} from "~/types/interfaces";
import type {ProductItem} from "~/types/types";

interface Props {
  menuList: MenuListInterface<ProductItem[]>[]
}

const value = ref('')
const props = defineProps<Props>()
const dynamicList = computed(() =>{
  return props.menuList.map((item)=> ({
    value: item.id,
    label: item.name
  }))
})
const selectedMenu = ref(dynamicList.value[0])

</script>

<template>
  <div class="">
    <div class="flex flex-col gap-8">
      <MyInput placeholder="Поиск продуктов" v-model="value" />
      <HorizontalScroll :list="dynamicList" v-model="selectedMenu" />
      <slot :current-tab="selectedMenu.value" :search-word="value" />

    </div>
  </div>
</template>