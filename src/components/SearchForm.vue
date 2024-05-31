<script setup lang="ts">

import {menuList} from "~/constants";


const value = ref('')
const dynamicMenuList = computed(() =>{
  return menuList.map((item)=> ({
    value: item.id,
    label: item.name
  }))
})

const selectedMenu = ref(dynamicMenuList.value[0])

</script>

<template>
  <div class="">
    <div class="flex flex-col gap-8">
      <MyInput placeholder="Поиск продуктов" v-model="value" />
      <HorizontalScroll :list="dynamicMenuList" v-model="selectedMenu" />
      <slot :current-tab="selectedMenu.value" :search-word="value" />

    </div>
  </div>
</template>