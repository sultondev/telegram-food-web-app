<script setup lang="ts">
import type {MenuListInterface} from "~/types/interfaces";
import type {ProductItem} from "~/types/types";


interface Props {
  menuList: MenuListInterface<ProductItem[]>[]
  searchWord: string
}

const props = defineProps<Props>()

const products = computed(() => {
  return props.menuList.filter(category =>
      category.products.some(item => {
            const txt = item.name.toLowerCase()
            return txt.includes(props.searchWord.toLowerCase())
      })
  ).flatMap(item => item.products).filter(item => {
    const txt = item.name.toLowerCase()
    return txt.includes(props.searchWord.toLowerCase())
  });
})

</script>

<template>
  <div v-if="products.length > 0" class="grid grid-cols-2 lg:grid-cols-3 gap-4" >
    <MenuListItem v-for="item in products" :key="item.id+'dsadsa23'" :product="item" />
  </div>
  <div v-else class="">
    No result
  </div>
</template>