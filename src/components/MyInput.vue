<script setup lang="ts">
interface Props {
  placeholder?: string
}
const model = defineModel()
withDefaults(defineProps<Props>(), {
  placeholder: ''
})
</script>

<template>
  <div class="group flex items-center shadow-rg focus-within:border-orange-500 border border-transparent gap-2  py-2 px-4 rounded-md">
    <Icon name="mingcute:search-fill" color="orange" class="" />
    <InputText id="food-name" v-model="model"
             variant="outlined"
             :unstyled="true"
             class="w-full flex-1 outline-none"
             :placeholder="placeholder"
             aria-describedby="food-name-help" />
  </div>
</template>