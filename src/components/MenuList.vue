<script setup lang="ts">
import type {MenuListInterface} from "~/types/interfaces";
import type {ProductItem} from "~/types/types";


interface Props {
  menuList: MenuListInterface<ProductItem[]>[]
  activeTab: number
}

const props = defineProps<Props>()

const products = computed(() => {
  return props.menuList.filter((item) => {
    return item.id === props.activeTab
  }).flatMap((item) => {
    return item.products
  })
})

</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
    <MenuListItem v-for="item in products" :key="item.id+'ds2321sa2'" :product="item" />
  </div>
</template>